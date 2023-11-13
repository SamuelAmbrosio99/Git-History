import { Fragment, Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Dialog, Transition } from "@headlessui/react"
import { useApi } from "@/context/data"
import { ModalBodyProps, ModalProps } from '@/models/modal'

export const Modal = ({ show, setShow, children }: ModalProps) => {
    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setShow(false)}>
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
                    <div className="flex lg:min-h-full mt-64 lg:mt-0 items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            {children}
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
            </Transition.Root>
    )
}

const ModalBody = forwardRef<HTMLInputElement, ModalBodyProps>((props, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1 justify-center">
                        <h3 className="text-base font-semibold leading-6 text-gray-900 text-center">
                            Change {props.title}
                        </h3>
                        <div className="mt-2 flex justify-center">
                            <input
                                type="text"
                                placeholder="Type here"
                                ref={(el) => {
                                    inputRef.current = el;
                                    if (ref) {
                                        if (typeof ref === 'function') {
                                            ref(el);
                                        } else if (typeof ref === 'object') {
                                            ref.current = el;
                                        }
                                    }
                                }}
                                className="bg-white text-black input input-bordered w-full max-w-xs"
                                defaultValue={props.value}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                    onClick={() => props.handleChange(inputRef.current?.value ?? '')}
                >
                    Change
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.handleCloseModal(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
});

export const ChangeUserModal = () => {
    const { user, setUser, showUserChange, setShowUserChange } = useApi()
    const modalRef = useRef<HTMLInputElement>(null);

    const handleUserChange = (user: string) => {
        if (!user) return
        setUser(user)
        setShowUserChange(false)
    }

    return (
        <Modal show={showUserChange} setShow={setShowUserChange}>
            <ModalBody
                ref={modalRef}
                title="User"
                value={user}
                handleChange={handleUserChange}
                handleCloseModal={setShowUserChange}
            />
        </Modal>
    )
}

export const ChangeRepoModal = () => {
    const { repo, setRepo, showRepoChange, setShowRepoChange } = useApi()
    const modalRef = useRef<HTMLInputElement>(null);

    const handleRepoChange = (repo: string) => {
        if (!repo) return
        setRepo(repo)
        setShowRepoChange(false)
    }

    return (
        <Modal show={showRepoChange} setShow={setShowRepoChange}>
            <ModalBody
                ref={modalRef}
                title="Repo"
                value={repo}
                handleChange={handleRepoChange}
                handleCloseModal={setShowRepoChange}
            />
        </Modal>
    )
}