import * as React from 'react';
import { Input } from 'react-native-elements';
import styles from './styles';

type Skill = {
    id: number,
    name: string
};

type Props = {
    name: string,
    errorMessage: string | null,
    loading: boolean | null,
    createSkill: ({variables: {name: string}}) => void,
    moveBack: (skill: Skill) => void,
    onChangeText: (string) => void

};

class SkillInput extends React.Component<Props> {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        const { skill } = nextProps;
        if (skill) {
            this.props.moveBack(skill); 
        }
    }

    private onSubmitEditing = () => {
        // TODO: we should not allow user to create new skills. Instead we should create them beforehands.
        this.props.createSkill({variables: { name: this.props.name }})
    }

    private onChangeText = (name: string) => {
        this.props.onChangeText(name);
    }

    public render() {
        const { name, errorMessage } = this.props;
        return(
            <Input
                placeholder='Skill(ex: Ruby)'
                containerStyle={styles.inputContainer}
                value={name}
                onChangeText={(changedName) => this.onChangeText(changedName)}
                onSubmitEditing={() => this.onSubmitEditing()}
                errorStyle={styles.errorMessage}
                errorMessage={errorMessage}
            />
        )
    }

};

export default SkillInput;

