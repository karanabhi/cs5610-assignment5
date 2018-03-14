defmodule Memory.GamesChannel do
  #  use Memory.Web, :channel
  use Phoenix.Channel

  def join("games:"<>name,payload,socket) do
    {:ok,%{"FinallyJoined"=>name},socket}
  end

  #def handle_in("gName", payload, socket) do
  #    gName=payload["gameName"];
  #    {:reply, {:ok, resp}, socket}
  #  end

  def handle_in("gName", payload, socket) do
    gName=payload["gameName"];
    #Game Created
    {:ok,pid}=Memory.Game.start(gName);
    Memory.Game.put(pid,"gameName", gName)
    {gm}=Memory.Game.get(pid,"gameName")
    #{msg}=Memory.Game.check_game_name(pid);
    resp = %{  "gameName" => gName, "message" => gm }
    {:reply, {:ok, resp}, socket}
  end

end
