import * as React from "react";
import {
  View
} from "react-native"

type Props = {
  subscribeComments: () => void
}

type State = {

}

class CommentList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.subscribeComments();
  } 

  render() {
    return(<View/>)
  }
}

export default CommentList;