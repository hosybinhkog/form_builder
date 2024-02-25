import React, { useTransition } from 'react';
import { Button } from './ui/button';
import { HiSaveAs } from 'react-icons/hi';
import useDesigner from './hooks/useDesigner';
import { UpdateFormContent } from '@/actions/form';
import { toast } from './ui/use-toast';
import { FaSpinner } from 'react-icons/fa';

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
  const updateFormContent = async () => {
    try {
      const jsonElement = JSON.stringify(elements);
      await UpdateFormContent(jsonElement, id);
      toast({
        title: 'Success',
        description: 'update document successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'update document failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      onClick={() => {
        startTransition(updateFormContent);
      }}
      variant={'outline'}
      className="gap-2"
      disabled={loading}
    >
      <HiSaveAs className="h-4 w-4" />
      <span>Save</span>
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
