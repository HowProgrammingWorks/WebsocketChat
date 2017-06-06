using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WebSocketSharp.Server;

namespace SimpeSocketChat
{
    class Program
    {
        static void Main(string[] args)
        {
            var wssv = new WebSocketServer("ws://localhost:8085");
            wssv.AddWebSocketService<ChatServer>("/chat");
            wssv.Start();
            Console.WriteLine("Server started...");
            Console.ReadKey(true);
            wssv.Stop();
            Console.WriteLine("Server stopped");
            Console.ReadKey();
        }
    }
}
