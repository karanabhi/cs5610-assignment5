defmodule MemoryWeb.GameChannel do
  use Phoenix.Channel

  alias Memory.Game

  def join("game:" <> name, payload, socket) do
      socket = socket
               |> assign(:game_name, name)
      {:ok, %{state: Game.get_game_state(socket.assigns.game_name)}, socket}
  end

  def handle_in("game:reset", %{}, socket) do
    push socket, "game:update", %{state: Game.reset_game_state(socket.assigns.game_name)}
    {:noreply, socket}
  end

  def handle_in("game:move", %{"game_index" => game_index}, socket) do
    new_state = Game.determine_visibility_stateless(socket.assigns.game_name, game_index)
    if elem(new_state, 0) == :publish do
      push socket, "game:intermediate", %{state: elem(new_state, 1)}
      Process.send_after(self(), {:after_delay, game_index}, 1000)
    else
      push socket, "game:update", %{state: Game.recompute_game_state(socket.assigns.game_name, game_index)}
    end
    {:noreply, socket}
  end

  def handle_info({:after_delay, game_index}, socket) do
    push socket, "game:update", %{state: Game.recompute_game_state(socket.assigns.game_name, game_index)}
    {:noreply, socket}
  end


end
