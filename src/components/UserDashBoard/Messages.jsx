const Messages = () => {
  const messages = [
    {
      name: "User Name",
      message: "What's going on?",
      image: "https://material-ui.com/static/images/avatar/2.jpg",
    },
    {
      name: "John Doe",
      message: "What's going on?",
      image: "https://material-ui.com/static/images/avatar/4.jpg",
    },
    {
      name: "John Doe",
      message: "What's going on?",
      image: "https://material-ui.com/static/images/avatar/1.jpg",
    },
    {
      name: "John Doe",
      message: "What's going on?",
      image: "https://material-ui.com/static/images/avatar/3.jpg",
    },
  ];

  return (
    <div className=" bg-teal-100 shadow-md rounded-lg p-6 w-full">
      <h3 className="text-lg font-semibold mb-4 p-2  bg-white rounded-md">
        Message
      </h3>
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img src={msg.image} alt="user" className=" rounded-full h-10" />
            <div>
              <h4 className="text-sm font-medium">{msg.name}</h4>
              <p className="text-xs text-gray-500">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
