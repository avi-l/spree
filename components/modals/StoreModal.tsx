"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title='Create Store'
      description='Add a new store'
      isOpen
      onClose={onClose}
    >
      Futre Create Store Form
    </Modal>
  );
};
