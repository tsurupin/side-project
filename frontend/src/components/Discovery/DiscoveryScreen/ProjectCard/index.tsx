import * as React from 'react';
import { ProjectCore } from '../../../../interfaces';
import ItemCard from '../ItemCard';
interface Props {
  project: ProjectCore;
  onPressCard: (id: string) => void;
}

const ProjectCard: React.SFC<Props> = (props) => {
  const { project, onPressCard } = props;

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
