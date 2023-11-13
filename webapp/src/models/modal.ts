export interface ModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

export interface ModalBodyProps {
    title: string;
    value: string;
    handleChange: (value: string) => void;
    handleCloseModal: (close: boolean) => void;
}