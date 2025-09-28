import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, MessageCircle, Shield, Zap } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const handleGetStarted = () => {
    router.push('/signin');
  };

  const handleNotificationsClick = () => {
    router.push('/addfriend');
  };

  const features = [
    {
      icon: Users,
      title: 'Connect with your Besties',
      description: 'Build meaningful connections with people around the world',
      color: '#5d258a',
    },
    {
      icon: MessageCircle,
      title: 'Notifications',
      description: 'Notify your friends but not like before.',
      color: '#8B5CF6',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are 100% encrypted and protected',
      color: '#10B981',
    },
    {
      icon: Zap,
      title: 'Freakingly Fast',
      description: 'Fully optimized for speed and performance',
      color: '#F59E0B',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#5d258aff', '#c534c3ff', '#dc2e65ff', '#961c2fff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: -1 }}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Welcome to Notigasm!</Text>
          <Text style={styles.heroSubtitle}>
            The most fun and exciting way to stay connected with your friends and exes!
          </Text>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8} onPress={handleGetStarted}>
            <Text style={styles.ctaButtonText}>Get Started!</Text>
          </TouchableOpacity>
          <Image
          source={require('../../assets/images/chatgpt.png')}
          style={{ width: 200, height: 200, marginTop:35, marginBottom: -60}}
          resizeMode="contain"
        />


        </View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Why Choose Notigasm?</Text>
        <Text style={styles.sectionDescription}>
          Discover the features that make our platform special
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => {
            const isNotifications = feature.title === 'Notifications';
            const CardComponent = isNotifications ? TouchableOpacity : View;
            const cardProps = isNotifications ? { 
              activeOpacity: 0.8, 
              onPress: handleNotificationsClick 
            } : {};

            return (
              <CardComponent key={index} style={styles.featureCard} {...cardProps}>
                <View style={[styles.iconContainer, { backgroundColor: `${feature.color}15` }]}>
                  <feature.icon size={32} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </CardComponent>
            );
          })}
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50M+</Text>
            <Text style={styles.statLabel}>Notigasms Sent</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Uptime</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5d258a',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: 20,
    marginBottom: 48,
  },
  featureCard: {
    backgroundColor: '#F9FAFB',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#c534c3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});