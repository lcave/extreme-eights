class MessagesChannel < ApplicationCable::Channel
  state_attr_accessor :chatroom

  def subscribed
    # self.workspace = Chatroom.find_by(public_id: params[:id])
    # return reject unless workspace

    # stream_for workspace
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
