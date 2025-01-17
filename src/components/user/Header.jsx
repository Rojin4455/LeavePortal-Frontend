import React,{useState, useEffect} from 'react'
import { Bell, Menu, User, X } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function Header({setIsMobileMenuOpen, isMobileMenuOpen}) {
    // const [notifications] = useState([
    //     { id: 1, message: 'Your leave request was approved', time: '2 hours ago' },
    //     { id: 2, message: 'New company policy update', time: '1 day ago' },
    //   ]);
    //   const [showNotifications, setShowNotifications] = useState(false);


const userName = useSelector((state) => state.user.userName)

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-gray-800">Leave Portal</span>
          </div>
        </div>
        

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-gray-700 relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div> */}

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">{userName}</p>
              <p className="text-xs text-gray-500">Engineering</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )


}
