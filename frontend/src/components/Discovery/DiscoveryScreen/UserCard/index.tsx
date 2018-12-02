import * as React from 'react';
import ItemCard from '../ItemCard';
import { UserCore } from '../../../../interfaces';

type Props = {
  user: UserCore;
  onPressCard: (id: string) => void;
};

const buildProfessionText = (
  occupation: string | undefined,
  companyName: string | undefined,
) => {
  if (occupation && companyName) {
    return `${occupation}, ${companyName}`;
  } else {
    return `${occupation || companyName}`;
  }
};

const UserCard: React.SFC<Props> = (props) => {
  const { user, onPressCard } = props;

  const {
    id,
    mainPhotoUrl,
    introduction,
    occupationType,
    occupation,
    companyName,
    city,
    displayName,
  } = user;

  const profession = buildProfessionText(occupation, companyName);

  return (
    <ItemCard
      id={id}
      title={displayName}
      city={city}
      badgeText={occupationType ? occupationType.name : undefined}
      subText={profession}
      details={introduction}
      mainPhotoUrl={mainPhotoUrl}
      onPressCard={onPressCard}
    />
  );
};

export default UserCard;
