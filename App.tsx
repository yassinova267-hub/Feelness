import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  TextInput,
  Linking,
  Image,
} from 'react-native';

const COLORS = {
  background: '#F5F4EF',
  green: '#506754',
  white: '#FFFFFF',
  text: '#111111',
  muted: '#777777',
  danger: '#E74C3C',
  gold: '#D4AF37',
};

const MOODS = [
  { title: 'Calm', icon: '🍃', color: '#DDE8D8' },
  { title: 'Energized', icon: '✦', color: '#F6D8D1' },
  { title: 'Focused', icon: '◎', color: '#DDE5F3' },
  { title: 'Grounded', icon: '▲', color: '#E7DDD2' },
];

const DEFAULT_VIDEOS = {
  Calm: [
    { id: '1', title: 'Soft Breathing Reset', duration: '8 min', access: 'free', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
    { id: '2', title: 'Deep Nervous System Calm', duration: '15 min', access: 'pro', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
  ],
  Energized: [
    { id: '3', title: 'Morning Energy Flow', duration: '10 min', access: 'free', url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' },
    { id: '4', title: 'HIIT Mood Boost', duration: '18 min', access: 'pro', url: 'https://www.youtube.com/watch?v=UBMk30rjy0o' },
  ],
  Focused: [
    { id: '5', title: 'Focus Reset Yoga', duration: '12 min', access: 'free', url: 'https://www.youtube.com/watch?v=4pLUleLdwY4' },
    { id: '6', title: 'Deep Productivity Flow', duration: '22 min', access: 'pro', url: 'https://www.youtube.com/watch?v=lFcSrYw-ARY' },
  ],
  Grounded: [
    { id: '7', title: 'Grounding Session', duration: '11 min', access: 'free', url: 'https://www.youtube.com/watch?v=5GSMRUl9UPo' },
    { id: '8', title: 'Earth Energy Recovery', duration: '20 min', access: 'pro', url: 'https://www.youtube.com/watch?v=sTANio_2E0Q' },
  ],
};

const DEFAULT_SHOPS = [
  { name: 'Nike London Outlet', link: 'https://www.nike.com/gb/' },
  { name: 'Gymshark UK', link: 'https://uk.gymshark.com/' },
  { name: 'ASOS Activewear', link: 'https://www.asos.com/women/sportswear/' },
  { name: 'Depop Gymwear', link: 'https://www.depop.com/' },
];

const GALLERY = [
  { id: '1', title: 'Forest Calm', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
  { id: '2', title: 'Ocean Focus', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
  { id: '3', title: 'Mountain Energy', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' },
];

export default function App() {
  const [role, setRole] = useState('free');
  const [selectedMood, setSelectedMood] = useState('Calm');
  const [videosByMood, setVideosByMood] = useState(DEFAULT_VIDEOS);
  const [shops, setShops] = useState(DEFAULT_SHOPS);

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [proLoggedIn, setProLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [savedUser, setSavedUser] = useState(null);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [unlockPassword, setUnlockPassword] = useState('');

  const [videoTitle, setVideoTitle] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [shopName, setShopName] = useState('');
  const [shopLink, setShopLink] = useState('');

  const ADMIN_SECRET = 'feelness123';

  const visibleVideos = useMemo(() => {
    const videos = videosByMood[selectedMood] || [];
    if (role === 'admin' && adminLoggedIn) return videos;
    if (role === 'pro' && proLoggedIn) return videos;
    return videos.filter((video) => video.access === 'free');
  }, [selectedMood, videosByMood, role, adminLoggedIn, proLoggedIn]);

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert('Error', 'Cannot open link');
    }
  };

  const loginAdmin = () => {
    if (adminPassword === ADMIN_SECRET) {
      setAdminLoggedIn(true);
      Alert.alert('Success', 'Admin login successful');
    } else {
      Alert.alert('Wrong Password', 'Invalid admin password');
    }
  };

  const signUpPro = () => {
    if (!username || !email || !password) {
      Alert.alert('Missing Fields', 'Complete all fields');
      return;
    }
    setSavedUser({ username, email, password, approved: false });
    Alert.alert('Request Sent', 'Your Pro request was submitted. Access will unlock after payment is confirmed.');
  };

  const approveUser = () => {
    if (!savedUser) {
      Alert.alert('No User', 'No pending user found');
      return;
    }
    if (unlockPassword !== 'movefitfeel2026') {
      Alert.alert('Wrong Password', 'Invalid unlock password');
      return;
    }
    setApprovedUsers((prev) => [...prev, savedUser.email]);
    setUnlockPassword('');
    Alert.alert('User Approved', `${savedUser.username} now has Pro access`);
  };

  const loginPro = () => {
    if (!savedUser) {
      Alert.alert('No Account', 'Create account first');
      return;
    }
    if (email === savedUser.email && password === savedUser.password) {
      if (!approvedUsers.includes(savedUser.email)) {
        Alert.alert('Access Locked', 'Your payment has not been approved yet by admin.');
        return;
      }
      setProLoggedIn(true);
      Alert.alert('Welcome Back', savedUser.username);
    } else {
      Alert.alert('Login Failed', 'Wrong email or password');
    }
  };

  const logout = () => {
    setRole('free');
    setProLoggedIn(false);
    setAdminLoggedIn(false);
    Alert.alert('Logged Out', 'You signed out');
  };

  const uploadVideo = () => {
    if (!videoTitle || !videoDuration || !videoUrl) {
      Alert.alert('Missing Fields', 'Complete all fields');
      return;
    }
    const newVideo = {
      id: Date.now().toString(),
      title: videoTitle,
      duration: videoDuration,
      access: 'pro',
      url: videoUrl,
    };
    setVideosByMood((prev) => ({
      ...prev,
      [selectedMood]: [...(prev[selectedMood] || []), newVideo],
    }));
    setVideoTitle('');
    setVideoDuration('');
    setVideoUrl('');
    Alert.alert('Uploaded', 'Video uploaded');
  };

  const deleteVideo = (videoId) => {
    setVideosByMood((prev) => ({
      ...prev,
      [selectedMood]: prev[selectedMood].filter((video) => video.id !== videoId),
    }));
    Alert.alert('Deleted', 'Video removed');
  };

  const addShop = () => {
    if (!shopName || !shopLink) {
      Alert.alert('Missing Fields', 'Add shop name and link');
      return;
    }
    const newShop = { name: shopName, link: shopLink };
    setShops((prev) => [...prev, newShop]);
    setShopName('');
    setShopLink('');
    Alert.alert('Added', 'Shop added');
  };

  const removeShop = (name) => {
    setShops((prev) => prev.filter((shop) => shop.name !== name));
    Alert.alert('Removed', `${name} removed`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>feelness</Text>
        <Text style={styles.subtitle}>Mood wellness platform</Text>

        {(adminLoggedIn || proLoggedIn) && (
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Dress the mood.</Text>
          <Text style={styles.heroAccent}>Move the feeling.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {GALLERY.map((item) => (
            <View key={item.id} style={styles.galleryCard}>
              <Image source={{ uri: item.image }} style={styles.galleryImage} />
              <Text style={styles.galleryTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.roleRow}>
          {['free', 'pro', 'admin'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.roleButton, role === item && styles.roleButtonActive]}
              onPress={() => setRole(item)}
            >
              <Text style={[styles.roleText, role === item && styles.roleTextActive]}>
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {role === 'admin' && !adminLoggedIn ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Admin Login</Text>
            <TextInput
              placeholder="Admin Password"
              secureTextEntry
              value={adminPassword}
              onChangeText={setAdminPassword}
              style={styles.input}
            />
            <TouchableOpacity style={styles.mainButton} onPress={loginAdmin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : role === 'pro' && !proLoggedIn ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Upgrade To Pro</Text>
            <Text style={styles.infoText}>
              Unlock all premium mood videos.
            </Text>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
            <TouchableOpacity style={styles.proUpgradeCard} onPress={signUpPro}>
              <Text style={styles.proUpgradeTitle}>Request Pro Access</Text>
              <Text style={styles.proUpgradeEmail}>Submit your account request first</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={loginPro}>
              <Text style={styles.secondaryText}>Already paid? Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Choose Mood</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
              {MOODS.map((mood) => (
                <TouchableOpacity
                  key={mood.title}
                  style={[styles.moodCard, { backgroundColor: mood.color }]}
                  onPress={() => setSelectedMood(mood.title)}
                >
                  <Text style={styles.moodEmoji}>{mood.icon}</Text>
                  <Text style={styles.moodText}>{mood.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>{selectedMood} Videos</Text>
            {visibleVideos.map((video) => (
              <View key={video.id} style={styles.videoCard}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => openLink(video.url)}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoDuration}>{video.duration}</Text>
                </TouchableOpacity>
                {role === 'admin' && adminLoggedIn && (
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteVideo(video.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <Text style={styles.sectionTitle}>Gymwear Inspiration</Text>
            {shops.map((shop) => (
              <View key={shop.name} style={styles.videoCard}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => openLink(shop.link)}>
                  <Text style={styles.videoTitle}>{shop.name}</Text>
                </TouchableOpacity>
                {role === 'admin' && adminLoggedIn && (
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removeShop(shop.name)}>
                    <Text style={styles.deleteText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {role === 'admin' && adminLoggedIn && (
              <>
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Approve Pro User</Text>
                  <Text style={styles.infoText}>Unlock Pro access after confirming payment manually.</Text>
                  {savedUser ? (
                    <>
                      <Text style={styles.infoText}>Pending User: {savedUser.username}</Text>
                      <TextInput
                        placeholder="Unlock Password"
                        secureTextEntry
                        value={unlockPassword}
                        onChangeText={setUnlockPassword}
                        style={styles.input}
                      />
                      <TouchableOpacity style={styles.mainButton} onPress={approveUser}>
                        <Text style={styles.buttonText}>Unlock Pro Access</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={styles.infoText}>No user pending approval.</Text>
                  )}
                </View>

                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Upload Mood Video</Text>
                  <TextInput placeholder="Video Title" value={videoTitle} onChangeText={setVideoTitle} style={styles.input} />
                  <TextInput placeholder="Duration" value={videoDuration} onChangeText={setVideoDuration} style={styles.input} />
                  <TextInput placeholder="YouTube URL" value={videoUrl} onChangeText={setVideoUrl} style={styles.input} />
                  <TouchableOpacity style={styles.mainButton} onPress={uploadVideo}>
                    <Text style={styles.buttonText}>Upload Video</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Add Gymwear Shop</Text>
                  <TextInput placeholder="Shop Name" value={shopName} onChangeText={setShopName} style={styles.input} />
                  <TextInput placeholder="Shop Link" value={shopLink} onChangeText={setShopLink} style={styles.input} />
                  <TouchableOpacity style={styles.mainButton} onPress={addShop}>
                    <Text style={styles.buttonText}>Add Shop</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20, paddingBottom: 100 },
  logo: { fontSize: 48, fontWeight: '800' },
  subtitle: { fontSize: 18, color: COLORS.muted, marginBottom: 20 },
  logoutButton: { backgroundColor: COLORS.danger, padding: 12, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 20 },
  logoutText: { color: '#fff', fontWeight: '700' },
  hero: { backgroundColor: '#EEF4EC', padding: 24, borderRadius: 30, marginBottom: 24 },
  heroTitle: { fontSize: 42, fontWeight: '800' },
  heroAccent: { fontSize: 42, fontStyle: 'italic', color: COLORS.green },
  heroDesc: { marginTop: 12, fontSize: 18, color: COLORS.muted },
  galleryCard: { marginRight: 16, marginBottom: 24 },
  galleryImage: { width: 260, height: 180, borderRadius: 24 },
  galleryTitle: { marginTop: 10, fontWeight: '700', fontSize: 18 },
  roleRow: { flexDirection: 'row', marginBottom: 24 },
  roleButton: { backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 20, marginRight: 10 },
  roleButtonActive: { backgroundColor: COLORS.green },
  roleText: { fontWeight: '700' },
  roleTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', padding: 24, borderRadius: 30, marginBottom: 20 },
  sectionTitle: { fontSize: 28, fontWeight: '800', marginBottom: 18 },
  infoText: { color: COLORS.muted, marginBottom: 18, lineHeight: 24 },
  input: { backgroundColor: '#F7F7F7', borderRadius: 18, padding: 16, marginBottom: 16 },
  mainButton: { backgroundColor: COLORS.green, padding: 18, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  secondaryButton: { marginTop: 16, alignItems: 'center' },
  secondaryText: { color: COLORS.green, fontWeight: '700' },
  proUpgradeCard: { backgroundColor: COLORS.gold, padding: 22, borderRadius: 30, alignItems: 'center' },
  proUpgradeTitle: { fontSize: 24, fontWeight: '800' },
  proUpgradeEmail: { marginTop: 10, fontWeight: '700' },
  moodCard: { width: 140, height: 140, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  moodEmoji: { fontSize: 42 },
  moodText: { marginTop: 10, fontWeight: '700', fontSize: 20 },
  videoCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  videoTitle: { fontSize: 20, fontWeight: '700' },
  videoDuration: { marginTop: 8, color: COLORS.muted },
  deleteButton: { backgroundColor: COLORS.danger, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16 },
  deleteText: { color: '#fff', fontWeight: '700' },
});
