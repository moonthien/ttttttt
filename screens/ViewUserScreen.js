import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function ViewUserScreen({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [birthday, setBirthday] = useState(new Date(user.birthday));
  const [avatar, setAvatar] = useState(user.avatar);
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);


  const handleImagePicker = async () => {
    // Danh sách các link ảnh từ Cloudinary
    const cloudinaryImageLinks = [
      'https://res.cloudinary.com/dh88asro9/image/upload/v1733845765/IMG_1233_mkmasu.jpg',
      'https://res.cloudinary.com/dh88asro9/image/upload/v1733845746/FOIL4327_dwphfp.jpg',
      'https://res.cloudinary.com/dh88asro9/image/upload/v1733841681/GOYX4963_ieiskz.jpg',
    ];
  
    // Mở picker để chọn ảnh
    setImageUri(cloudinaryImageLinks[0]); // Mặc định chọn ảnh đầu tiên
    setImageFile(cloudinaryImageLinks); // Cập nhật tất cả các ảnh vào state
  };
  
  const handleImageChange = (selectedImageUri) => {
    setImageUri(selectedImageUri); // Cập nhật ảnh đã chọn vào state
  };
  

  const handleSave = async () => {
    const data = new URLSearchParams();
    // Use user.id from route params for the correct URL
    data.append('id', user.id);
  
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('role', role);
    const localDate = birthday.toLocaleDateString('en-CA');
    data.append('birthday', localDate);
 
      data.append('avatar', imageUri); 
   
  
    try {
      // Use the correct user ID in the URL for the API call
      const response = await axios.put(`https://6758675a60576a194d10606b.mockapi.io/oncuoiki/${user.id}`, data.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
  
      alert('Update successful');
      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      alert('Error updating user: ' + error.message);
    }
  };
  

  return (
    <ScrollView style={{ width: "100%", height: 500 }}>
    <View style={styles.container}>
    <TouchableOpacity onPress={handleImagePicker}>
        <Image
          source={{ uri: imageUri || avatar }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {imageFile && (
        <Picker
          selectedValue={imageUri}  // Đảm bảo selectedValue liên kết đúng với imageUri
          onValueChange={handleImageChange}  // Khi người dùng chọn ảnh mới, cập nhật imageUri
          style={{ height: 50, marginBottom: 20 }}
        >
          {imageFile.map((uri, index) => (
            <Picker.Item key={index} label={`Image ${index + 1}`} value={uri} />
          ))}
        </Picker>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
        >
          <Picker.Item label="Select role" value="" />
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="User" value="User" />
        </Picker>
      </View>

      <View style={[styles.inputContainer, { zIndex: 10 }]}>
        <Text style={styles.label}>Birthday</Text>
        <DatePicker
          selected={birthday}
          onChange={setBirthday}
          dateFormat="yyyy/MM/dd"
          customInput={<TextInput style={styles.input} />}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
});
