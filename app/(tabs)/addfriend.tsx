import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Alert, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Search, Check, X, Users, Star, MessageCircle } from 'lucide-react-native';
import MessageModal from '../../components/MessageModal';
import { useRouter } from 'expo-router';

interface Friend {
  id: string;
  name: string;
  username: string;
  mutualFriends: number;
  status: 'none' | 'pending' | 'added';
  isOnline: boolean;
  poked?: boolean;
}

export default function AddFriendPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'suggestions'>('search');
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const [suggestedFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'John Snow',
      username: '@johnsnow',
      mutualFriends: 12,
      status: 'none',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Tyrion Lannister',
      username: '@tyrionl',
      mutualFriends: 8,
      status: 'pending',
      isOnline: false,
    },
    {
      id: '3',
      name: 'Joffrey Baratheon',
      username: '@joffreyb',
      mutualFriends: 15,
      status: 'none',
      isOnline: true,
    },
    {
      id: '4',
      name: 'Ramsay Bolton',
      username: '@ramsayb',
      mutualFriends: 5,
      status: 'added',
      isOnline: false,
    },
  ]);

  const [searchResults, setSearchResults] = useState<Friend[]>([
    {
      id: '5',
      name: 'Saul Goodman',
      username: '@saulgood',
      mutualFriends: 18,
      status: 'none',
      isOnline: true,
    },
    {
      id: '6',
      name: 'Jessy Pinkman',
      username: '@jessyp',
      mutualFriends: 6,
      status: 'none',
      isOnline: false,
    },
    {
      id: '7',
      name: 'Rachel Green',
      username: '@rachelg',
      mutualFriends: 23,
      status: 'none',
      isOnline: true,
    },
    {
      id: '8',
      name: 'Ron Weasley',
      username: '@ronw',
      mutualFriends: 9,
      status: 'none',
      isOnline: false
    },
    {
      id: '51',
      name: 'Walter White',
      username: '@walterwhite',
      mutualFriends: 8,
      status: 'none',
      isOnline: true,
    },
    {
      id: '61',
      name: 'Chandler Bing',
      username: '@chandlerb',
      mutualFriends: 6,
      status: 'none',
      isOnline: false,
    },
    {
      id: '17',
      name: 'Monica Geller',
      username: '@monicag',
      mutualFriends: 19,
      status: 'none',
      isOnline: true,
    },
    {
      id: '10',
      name: 'Ross Geller',
      username: '@rossg',
      mutualFriends: 11,
      status: 'none',
      isOnline: true,
    },
    {
      id: '11',
      name: 'Harry Potter',
      username: '@harryp',
      mutualFriends: 15,
      status: 'none',
      isOnline: true,
    },
    {
      id: '12',
      name: 'Hermione Granger',
      username: '@hermioneg',
      mutualFriends: 14,
      status: 'none',
      isOnline: true,
    },
    {
      id: '13',
      name: 'Tony Stark',
      username: '@ironman',
      mutualFriends: 31,
      status: 'none',
      isOnline: false,
    },
    {
      id: '14',
      name: 'Peter Parker',
      username: '@spidey',
      mutualFriends: 25,
      status: 'none',
      isOnline: true,
    },
    {
      id: '15',
      name: 'Michael Scott',
      username: '@worldsbestboss',
      mutualFriends: 22,
      status: 'none',
      isOnline: true,
    },
    {
      id: '16',
      name: 'Dwight Schrute',
      username: '@assistantregionalmanager',
      mutualFriends: 17,
      status: 'none',
      isOnline: false,
    },
    {
      id: '18',
      name: 'Jim Halpert',
      username: '@jimh',
      mutualFriends: 20,
      status: 'none',
      isOnline: true,
    },
    {
      id: '19',
      name: 'Pam Beesly',
      username: '@pamb',
      mutualFriends: 19,
      status: 'none',
      isOnline: true,
    },
  ]);

  const [friendRequests, setFriendRequests] = useState(suggestedFriends);

  const handleAddFriend = (friendId: string) => {
    // Update friendRequests
    setFriendRequests(prev =>
      prev.map(friend =>
        friend.id === friendId
          ? { ...friend, status: 'pending' }
          : friend
      )
    );
    // Update searchResults
    setSearchResults(prev =>
      prev.map(friend =>
        friend.id === friendId
          ? { ...friend, status: 'pending' }
          : friend
      )
    );
  };

  const handleCancelRequest = (friendId: string) => {
    setFriendRequests(prev =>
      prev.map(friend =>
        friend.id === friendId
          ? { ...friend, status: 'none' }
          : friend
      )
    );
  };

  const handleUnfriend = (friendId: string) => {
    Alert.alert(
      'Unfriend',
      'Are you sure you want to unfriend this person?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Unfriend',
          style: 'destructive',
          onPress: () => {
            // Update friendRequests
            setFriendRequests(prev =>
              prev.map(friend =>
                friend.id === friendId
                  ? { ...friend, status: 'none' as const }
                  : friend
              )
            );
            // Update searchResults
            setSearchResults(prev =>
              prev.map(friend =>
                friend.id === friendId
                  ? { ...friend, status: 'none' as const }
                  : friend
              )
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleMessage = (friendId: string) => {
    // Find the friend by ID from both arrays
    const friend = [...suggestedFriends, ...searchResults].find(f => f.id === friendId);
    if (friend) {
      setSelectedFriend(friend);
      setMessageModalVisible(true);
    }
  };

  const handleSendMessage = (message: string) => {
    console.log(`Sending message to ${selectedFriend?.name}: ${message}`);
    // Update the poked status for the friend in searchResults
    const updatedResults = searchResults.map(friend =>
      friend.id === selectedFriend?.id ? { ...friend, poked: true } : friend
    );
    setSearchResults(updatedResults);
    // For now, we'll just log it and close the modal
    setMessageModalVisible(false);
    setSelectedFriend(null);
  };

  const handleCloseModal = () => {
    setMessageModalVisible(false);
    setSelectedFriend(null);
  };

  const getStatusButton = (friend: Friend) => {
    switch (friend.status) {
      case 'pending':
        return (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelRequest(friend.id)}
            activeOpacity={0.8}
          >
            <X size={16} color="#EF4444" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        );
      case 'added':
        return (
          <TouchableOpacity
            style={styles.addedButton}
            onPress={() => handleUnfriend(friend.id)}
            activeOpacity={0.8}
          >
            <Check size={16} color="#10B981" />
            <Text style={styles.addedButtonText}>Friends</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const renderFriendCard = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: item.isOnline ? '#10B981' : '#6B7280' }]}>
            <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
          </View>
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendUsername}>{item.username}</Text>
          <View style={styles.mutualFriends}>
            <Users size={12} color="#6B7280" />
            <Text style={styles.mutualFriendsText}>{item.mutualFriends} mutual friends</Text>
          </View>
        </View>
      </View>
      {getStatusButton(item)}
    </View>
  );

  const renderSearchCard = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: item.isOnline ? '#10B981' : '#6B7280' }]}>
            <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
          </View>
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendUsername}>{item.username}</Text>
          <View style={styles.mutualFriends}>
            <Users size={12} color="#6B7280" />
            <Text style={styles.mutualFriendsText}>{item.mutualFriends} mutual friends</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.messageButton, item.poked && styles.messageButtonPoked]}
        onPress={() => handleMessage(item.id)}
        activeOpacity={0.8}
        disabled={item.poked}
      >
        <MessageCircle size={16} color={item.poked ? '#6B7280' : '#5d258a'} />
        <Text style={[styles.messageButtonText, item.poked && styles.messageButtonTextPoked]}>
          {item.poked ? 'Poked' : 'Poke'}
        </Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => router.replace('/(tabs)/addfriend')}
        activeOpacity={0.8}
      >
        <Text style={styles.headerTitle}>Connect with your Besties</Text>
        <Text style={styles.headerSubtitle}>Build meaningful connections with people around the world</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or username"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'search' && styles.activeTab]}
          onPress={() => setActiveTab('search')}
          activeOpacity={0.8}
        >
          <Search size={18} color={activeTab === 'search' ? '#5d258a' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'suggestions' && styles.activeTab]}
          onPress={() => setActiveTab('suggestions')}
          activeOpacity={0.8}
        >
          <Star size={18} color={activeTab === 'suggestions' ? '#5d258a' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'suggestions' && styles.activeTabText]}>
            Suggestions
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'search' ? (
          <FlatList
            data={searchResults}
            renderItem={renderSearchCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.friendsList}
            ListHeaderComponent={() => (
              <Text style={styles.sectionTitle}>Friends List:</Text>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Search size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateTitle}>No Results Found</Text>
                <Text style={styles.emptyStateDescription}>
                  Try searching with different keywords
                </Text>
              </View>
            )}
          />
        ) : (
          <FlatList
            data={friendRequests}
            renderItem={renderFriendCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.friendsList}
            ListHeaderComponent={() => (
              <Text style={styles.sectionTitle}>People You May Know</Text>
            )}
          />
        )}
      </View>

      {/* Message Modal */}
      <MessageModal
        visible={messageModalVisible}
        onClose={handleCloseModal}
        recipientName={selectedFriend?.name || ''}
        onSendMessage={handleSendMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#5d258a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchingText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  friendsList: {
    paddingBottom: 20,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  friendUsername: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  mutualFriends: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mutualFriendsText: {
    fontSize: 12,
    color: '#6B7280',
  },

  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  addedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  addedButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5d258a20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#5d258a40',
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5d258a',
  },
  messageButtonPoked: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  messageButtonTextPoked: {
    color: '#6B7280',
  },


});