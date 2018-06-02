import * as React from "react";
import {
  View
} from "react-native";

type Props = {
  user: UserDetail,
  onChange: (key: string, value: string) => void
};

type State = {

};
class EditForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View>
        <InputText key="" onChange={this.props.onChange}/>
        <InputText key="" onChange={this.props.onChange}/>
      </View>
    )
  }
}

export default EditForm;