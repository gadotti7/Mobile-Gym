import styled from 'styled-components/native';

export const Container = styled.View`
`;

export const Post = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #F5F5F5;
  elevation: 1;
  box-shadow: 5px 10px;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const ImageWorkout = styled.Image`
  width: 95%;
  height: 300px;
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const Name = styled.Text`
  font-weight: 600;
`;

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;
`;
