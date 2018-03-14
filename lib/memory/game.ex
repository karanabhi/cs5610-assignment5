defmodule Memory.Game do

  def start(gName) do
    Agent.start_link(fn->gName end)
  end

#  def check_game_name(pid) do
#    Agent.get(pid,fn(gname)->{
##        gname=="Pokemon"->"Game Exists"
  #      gname=="Beyblade"->"Game Exists"
  #      true->"Game does not exits"
#      end
    #}
  #end
#  )
#end

def put(pid, key, value) do
  Agent.update(pid, Map.put(key, value))
end

def get(pid, key) do
  Agent.get(pid, Map.get(pid, key))
end

end
