import { Fragment } from 'react'
import type { PropsWithChildren } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  subtitle?: string
}

export const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
}: PropsWithChildren<ModalProps>) => (
  <Transition show={open} as={Fragment}>
    <Dialog
      as="div"
      className="relative z-50"
      open={open}
      onClose={onClose}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center px-4 py-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-2xl shadow-primary-600/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900">
              <header className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-slate-900 dark:text-white">
                    {title}
                  </Dialog.Title>
                  {subtitle && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>
              <div>{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
)


