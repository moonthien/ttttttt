import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'; // Thêm import Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

export default function UserScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // State users
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [birthday, setBirthday] = useState(new Date());

  const handleAddImageUrls = () => {
    const newImageUrls = [
      'https://res.cloudinary.com/dh88asro9/image/upload/v1733845765/IMG_1233_mkmasu.jpg',
      'https://res.cloudinary.com/dh88asro9/image/upload/v1733841681/GOYX4963_ieiskz.jpg',
      'https://res.cloudinary.com/dh88asro9/image/upload/v1733845771/IMG_1234_abcd.jpg',
    ];
  
    setImageUrls((prevImageUrls) => [...prevImageUrls, ...newImageUrls]);
  };

  // Hàm lấy dữ liệu người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://6758675a60576a194d10606b.mockapi.io/oncuoiki'); // Địa chỉ API của danh sach user
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  // Hàm lọc danh sách người dùng dựa trên username
  const filterUsers = () => {
    return users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // const handleImagePicker = async () => {
  //   if (Platform.OS === 'web') {
  //     const input = document.createElement('input');
  //     input.type = 'file';
  //     input.accept = 'image/*';
  //     input.onchange = (event) => {
  //       const file = event.target.files[0];
  //       if (file) {
  //         setImageUri(URL.createObjectURL(file));
  //         setImageFile(file);
  //       }
  //     };
  //     input.click();
  //   } else {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setImageUri(result.assets[0].uri);
  //       setImageFile({
  //         uri: result.assets[0].uri,
  //         type: 'image/png',
  //         name: 'avatar.png',
  //       });
  //     }
  //   }
  // };

  // const handleImagePicker = async () => {
  //   // Danh sách các link ảnh từ Cloudinary
  //   const cloudinaryImageLinks = [
  //     'https://res.cloudinary.com/dh88asro9/image/upload/v1733845765/IMG_1233_mkmasu.jpg',
  //     'https://res.cloudinary.com/dh88asro9/image/upload/v1733845746/FOIL4327_dwphfp.jpg',
  //     'https://res.cloudinary.com/dh88asro9/image/upload/v1733841681/GOYX4963_ieiskz.jpg',
  //   ];
  
  //   // Cập nhật một mảng để lưu tất cả các ảnh
  //   const images = cloudinaryImageLinks.map((link) => ({
  //     uri: link,
  //     type: 'image/jpeg',  // Giả sử tất cả là ảnh JPEG
  //     name: link.split('/').pop(),  // Lấy tên ảnh từ link URL
  //   }));
  
  //   // Cập nhật state với tất cả các ảnh
  //   setImageFile(images);
  
  //   // Nếu bạn muốn hiển thị ảnh ngay lập tức, bạn có thể gọi setImageUri cho từng ảnh
  //   images.forEach((image) => {
  //     setImageUri(image.uri);
  //   });
  // };
  
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
  
  

  const handleAddUser = async () => {
    try {
      if (!username || !password || !email || !role ) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
      }

      const data = new URLSearchParams();

      data.append('username', username);
      data.append('password', password);
      data.append('email', email);
      data.append('role', role);
      data.append('birthday', birthday.toISOString().split('T')[0]);
      data.append('avatar', imageUri);
     // data.append('avatar', "https://res.cloudinary.com/dh88asro9/image/upload/v1733841681/GOYX4963_ieiskz.jpg");
      
      const response = await axios.post(
        'https://6758675a60576a194d10606b.mockapi.io/oncuoiki',
        data.toString(), // Chuyển dữ liệu thành chuỗi URL-encoded
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      

      if (response.status === 201) {
        alert('Thêm user thành công!');

        // Reset các trường dữ liệu
        setUsername('');
        setPassword('');
        setEmail('');
        setRole('');
        setImageUri(null);
        setImageFile(null);

        fetchUsers();
      }
    } catch (error) {
      console.error('Lỗi khi thêm user:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại.');
    }
  };

  // Handle delete user
  // Handle delete user
  const handleDeleteUser = async (id) => {
    try {
      console.log('id', id);
      const response = await axios.delete(`https://6758675a60576a194d10606b.mockapi.io/oncuoiki/${id}`);
  
      if (response.status === 200) {
        alert('Xóa user thành công');
        fetchUsers(); // Gọi lại để cập nhật danh sách sau khi xóa
      }
    } catch (error) {
      console.error('Lỗi xóa user:', error);
      alert('Không xóa được user');
    }
  };
  


  const renderUserRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('ViewUserScreen', { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={styles.roleContainer}>
        <Text style={[styles.role, item.role === 'Admin' && styles.adminRole]}>
          {item.role}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteIconContainer} 
        onPress={() => handleDeleteUser(item.id)}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );  

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", height: 500 }}>
        {/* Form inputs */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
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
        <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
  <Text style={styles.imagePickerText}>Upload Image</Text>
</TouchableOpacity>

{/* Picker để chọn ảnh */}
{imageFile && (
  <Picker
    selectedValue={imageUri}
    onValueChange={handleImageChange}
    style={{ height: 50, marginBottom: 20 }}
  >
    {imageFile.map((uri, index) => (
      <Picker.Item key={index} label={`Image ${index + 1}`} value={uri} />
    ))}
  </Picker>
)}

{/* Hiển thị ảnh đã chọn */}
{imageUri && (
  <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
)}



        <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
          <Text style={styles.addText}>Add user</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Search</Text>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm theo username"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filterUsers()}  
          renderItem={renderUserRow}
          // sử dụng keyExtractor này là MYSQL
          keyExtractor={(item) => item.id.toString()}

          // sử dụng keyExtractor này là MONGODB
          // keyExtractor={(item) => item._id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  roleContainer: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  deleteIconContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  role: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  adminRole: {
    backgroundColor: '#dff0d8',
    borderColor: '#3c763d',
    color: '#3c763d',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#666',
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imagePickerButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    height: 40, // Tăng chiều cao của picker
    borderWidth: 1, // Đặt đường viền cho picker
    borderColor: '#ccc', // Đặt màu viền cho picker
    borderRadius: 5, // Bo góc cho picker
    paddingHorizontal: 10, // Thêm padding ngang
  },
});
