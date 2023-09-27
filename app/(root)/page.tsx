"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useEffect } from "react";

const SetupPage = () => {
  const { isOpen, onOpen } = useStoreModal();
  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return <div className='p-4'>ROot Page</div>;
};
export default SetupPage;
