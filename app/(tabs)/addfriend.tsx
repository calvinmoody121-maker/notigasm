import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { Search, UserPlus, Check, X, Users, Star } from 'lucide-react-native';

interface Friend {
  id: string;
  name: string;
  username: string;
  mutualFriends: number;
  status: 'none' | 'pending' | 'added';
  isOnline: boolean;
}

export default function AddFriendPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'suggestions'>('search');

  const [suggestedFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      username: '@sarahj',
      mutualFriends: 12,
      status: 'none',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Mike Chen',
      username: '@mikechen',
      mutualFriends: 8,
      status: 'pending',
      isOnline: false,
    },
    {
      id: '3',
      name: 'Emma Wilson',
      username: '@emmaw',
      mutualFriends: 15,
      status: 'none',
      isOnline: true,
    },
    {
      id: '4',
      name: 'David Kumar',
      username: '@davidk',
      mutualFriends: 5,
      status: 'added',
      isOnline: false,
    },
  ]);

  const [friendRequests, setFriendRequests] = useState(suggestedFriends);

  const handleAddFriend = (friendId: string) => {
    setFriendRequests(prev =>
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
          <View style={styles.addedButton}>
            <Check size={16} color="#10B981" />
            <Text style={styles.addedButtonText}>Friends</Text>
          </View>
        );
      default:
        return (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddFriend(friend.id)}
            activeOpacity={0.8}
          >
            <UserPlus size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        );
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Friends</Text>
        <Text style={styles.headerSubtitle}>Connect with people you know</Text>
      </View>

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
          <Search size={18} color={activeTab === 'search' ? '#3B82F6' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'suggestions' && styles.activeTab]}
          onPress={() => setActiveTab('suggestions')}
          activeOpacity={0.8}
        >
          <Star size={18} color={activeTab === 'suggestions' ? '#3B82F6' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'suggestions' && styles.activeTabText]}>
            Suggestions
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'search' ? (
          <View style={styles.searchResults}>
            {searchQuery ? (
              <Text style={styles.searchingText}>Searching for "{searchQuery}"...</Text>
            ) : (
              <View style={styles.emptyState}>
                <Search size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateTitle}>Search for Friends</Text>
                <Text style={styles.emptyStateDescription}>
                  Enter a name or username to find and connect with friends
                </Text>
              </View>
            )}
          </View>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
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
    color: '#3B82F6',
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
});