import React from 'react';
import type { Activity } from '../../../types';
import ActivityForm from './ActivityForm';
import Modal from '../../../components/Modal';

interface ActivityDetailsModalProps {
  activity?: Activity;
  onClose: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  activity,
  onClose,
}) => {
  return (
    <Modal onClose={onClose} title={activity ? 'Edit Activity' : 'Add Activity'}>
      <ActivityForm activity={activity} onClose={onClose} />
    </Modal>
  );
};

export default ActivityDetailsModal;
