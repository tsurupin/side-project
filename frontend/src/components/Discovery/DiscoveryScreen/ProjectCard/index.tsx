import * as React from 'react';
import { ProjectCore } from '../../../../interfaces';
import ItemCard from '../ItemCard';
type Props = {
  project: ProjectCore;
  onPressCard: (id: string) => void;
};

const ProjectCard: React.SFC<Props> = ({ project, onPressCard }) => {
  const { id, mainPhotoUrl, leadSentence, genre, city, title } = project;

  return (
    <ItemCard
      id={id}
      title={title}
      city={city}
      badgeText={genre ? genre.name : undefined}
      details={leadSentence}
      mainPhotoUrl={mainPhotoUrl}
      onPressCard={onPressCard}
    />
  );
};

export default ProjectCard;
