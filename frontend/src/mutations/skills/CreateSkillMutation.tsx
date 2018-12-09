import * as React from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_SKILL_MUTATION } from '../../graphql/skills';

const CreateSkillMutation = (variables: { name: string }, parentProps: any, ChildComponent: any) => (
  <Mutation mutation={CREATE_SKILL_MUTATION}>
    {(createSkillMutation, { data, error, loading }) => {
      let errorMessage;
      let skill;
      if (error) {
        errorMessage = error.message;
      }
      if (data && data['createSkill']) {
        skill = data['createSkill'];
      }
      return (
        <ChildComponent
          name={variables.name}
          errorMessage={errorMessage}
          loading={loading}
          createSkill={createSkillMutation}
          onDismissModal={parentProps.moveBack}
          onChangeText={parentProps.onChangeText}
          skill={skill}
        />
      );
    }}
  </Mutation>
);

export default CreateSkillMutation;
