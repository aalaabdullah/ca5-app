import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { savePost } from "../Features/PostSlice";


const SharePosts = () => {

  const [postMsg, setPostMsg]= useState("")
  const { user } = useSelector((state) => state.users);


  const dispatch = useDispatch()

  const handlePost = async () => {
    // Validate that postMsg is not empty
    if (!postMsg.trim()) {
      alert("Post message is required."); // Display an alert or set an error state
      return; // Exit the function early if validation fails
    }

    const postData = {
      postMsg: postMsg,
      email: user.email,
    };

    dispatch(savePost(postData)); // Dispatch the savePost thunk from the Posts Slice.
    setPostMsg("")
  };



  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            value={postMsg}
            onChange={e => setPostMsg(e.target.value)}     //catch value
          />
          <Button onClick={handlePost}>PostIT</Button>
        </Col>
      </Row>
      <Row>
        
      </Row>
    </Container>
  );
};

export default SharePosts;
