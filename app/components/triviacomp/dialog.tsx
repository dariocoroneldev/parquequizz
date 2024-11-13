import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function DialogAnswer({ message }: any) {

  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  const isCorrect = message === 'Correcto'

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className={`bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ${isCorrect ? 'bg-blue-50' : 'bg-red-50'}`}>
                  <div className="sm:flex sm:items-start">
                    <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${isCorrect ? 'bg-blue-100' : 'bg-red-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                      {isCorrect ? <CheckCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" /> : <XCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        <span className={`flex items-center text-4xl font-bold ${isCorrect ? 'text-blue-500' : 'text-red-500'}`}>
                          {isCorrect ? '😊 Correcto' : '😞 Incorrecto'}
                        </span>
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md ${isCorrect ? 'bg-blue-600' : 'bg-red-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 sm:ml-3 sm:w-auto`}
                    onClick={() => setOpen(false)}
                  >
                    {isCorrect ? 'Aceptar' : 'Aceptar'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
