'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, HomeIcon, UsersIcon, ChatBubbleLeftRightIcon, UserGroupIcon, PaperAirplaneIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'

// Define the navigation items with icons
const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { name: 'Matches', to: '/matches', icon: UserGroupIcon },
  { name: 'Users', to: '/users', icon: UsersIcon },
  { name: 'Messages', to: '/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Send Message', to: '/send-message', icon: PaperAirplaneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navigation() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  if (isLoading) {
    return (
      <nav className="bg-blue-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">SMS V2</h1>
            </div>
            <div className="flex items-center">
              <span className="text-blue-100">Loading...</span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  if (!user) {
    return (
      <nav className="bg-blue-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">SMS V2</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/auth/login"
                className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <Disclosure as="nav" className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-blue-100 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <span className="text-white font-bold text-lg cursor-pointer">SMS V2</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.to
                  return (
                    <Link
                      key={item.name}
                      href={item.to}
                      aria-current={isActive ? 'page' : undefined}
                      className={classNames(
                        isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2',
                      )}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={user?.picture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="/auth/logout"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel transition className="sm:hidden origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => {
            const isActive = pathname === item.to
            return (
              <Link
                key={item.name}
                href={item.to}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium flex items-center gap-2',
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navigation 