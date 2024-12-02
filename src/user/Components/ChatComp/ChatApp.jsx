<div>
{userMessages.map((userMessage, index) => (
  <div key={index} className="flex-1 overflow-y-auto">
    {/* Contact's Message */}
    <div className="flex items-start gap-3">
      {contact?.image ? (
        <img
          src={contact.image}
          alt="Profile"
          className="rounded-full w-8 sm:w-8 h-8 sm:h-8 object-cover"
        />
      ) : (
        <FaUserCircle className="w-8 h-8 text-gray-700" />
      )}
      <div className="flex flex-col mt-2 mb-2">
        <div className="bg-white shadow-md p-2 rounded-lg w-auto max-w-md">
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-base text-black">
              {contact?.name}
            </span>
            <span className="text-gray-500 text-sm">
              10:30 AM
            </span>
          </div>
          <p className="text-base text-black">
            {index === 0
              ? contact.lastMessage
              : contactMessages[
                  Math.floor(
                    Math.random() * contactMessages.length
                  )
                ]}
          </p>
        </div>
      </div>
    </div>

    {/* User's Message */}
    <div className="flex justify-end mt-2 mb-2">
      <div className="bg-teal-100 shadow-md p-2 rounded-lg w-auto max-w-md">
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-base text-black">
            You
          </span>
          <span className="text-gray-500 text-sm">
            10:45 AM
          </span>
        </div>
        <p className="text-base text-black">{userMessage}</p>
      </div>
    </div>
  </div>
))}
</div>