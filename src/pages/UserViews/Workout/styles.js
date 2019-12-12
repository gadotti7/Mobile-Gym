import styled from 'styled-components/native';

export const Container = styled.ScrollView`
`;

export const Workout = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #F5F5F5;
  elevation: 1;
  box-shadow: 5px 10px;
  height: 100%;
  width: 100%;
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

export const Details = styled.Text`
  padding: 15px;
  line-height: 18px;
`;

export const AddWorkout = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #F5F5F5;
  elevation: 3;
`;
export const AddImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 10px;
  align-item: 'center';
`;
export const NewWorkout = styled.Text`
  padding: 15px;
  line-height: 18px;
  font-weight: 600;
  elevation: 1;
`;

export const Card = styled.View`
  background: #f0f0f0;
  border-radius: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  height: 100px;
  elevation: 1;
  box-shadow: 20px 25px;
`;

export const Title = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  font-size: 24px;
  margin-left: 5%;
`;

export const Description = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  margin-left: 5%;
`;

export const Exercicies = styled.ScrollView`
  
`;