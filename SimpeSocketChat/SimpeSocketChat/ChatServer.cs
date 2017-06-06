using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace SimpeSocketChat
{
    class ChatServer : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            var message = JsonConvert.DeserializeObject<Message>(e.Data);
            message.time = DateTime.Now.ToShortTimeString();
            Console.WriteLine(
                $"Sender: {message.sender}\nTime: {message.time}\nText: {message.text}\n-------------------\n");
            Sessions.Broadcast(JsonConvert.SerializeObject(message));
        }
    }
}
