import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const COLORS = {
  ink: '#F5EFE5',
  muted: '#9B968D',
  quiet: '#6E706C',
  canvas: '#0B0D0C',
  panel: '#151916',
  glass: 'rgba(255,255,255,0.075)',
  line: 'rgba(255,255,255,0.12)',
  champagne: '#D6B77A',
  champagneSoft: 'rgba(214,183,122,0.15)',
  sage: '#B8C1A5',
  copper: '#B87858',
};

const restaurants = [
  { name: 'Sambal Lab', type: 'Modern Malaysian', meta: '0.8 km · RM18–28', rating: '4.8', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=84', accent: COLORS.copper },
  { name: 'Noodle Club', type: 'Hand-pulled noodles', meta: '1.7 km · RM14–22', rating: '4.7', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=84', accent: COLORS.sage },
  { name: 'Common Man', type: 'Coffee & brunch', meta: '1.2 km · RM16–32', rating: '4.6', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=84', accent: COLORS.champagne },
];

type IconName = string;

function Icon({ name, size = 18, color = COLORS.ink }: { name: IconName; size?: number; color?: string }) {
  return <Feather name={name as React.ComponentProps<typeof Feather>['name']} size={size} color={color} />;
}

function GlassCard({ children, style }: { children: React.ReactNode; style?: object }) {
  return <BlurView intensity={22} tint="dark" style={[styles.glassCard, style]}>{children}</BlurView>;
}

function Atmosphere() {
  const drift = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(drift, { toValue: 1, duration: 5200, useNativeDriver: true }),
      Animated.timing(drift, { toValue: 0, duration: 5200, useNativeDriver: true }),
    ])).start();
  }, [drift]);
  const translateX = drift.interpolate({ inputRange: [0, 1], outputRange: [-8, 14] });
  return <>
    <Animated.View style={[styles.atmosphereOne, { transform: [{ translateX }] }]} />
    <View style={styles.atmosphereTwo} />
  </>;
}

function DiscoveryMap({ onOpenConcierge }: { onOpenConcierge: () => void }) {
  const pulse = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1.12, duration: 1600, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0.8, duration: 1600, useNativeDriver: true }),
    ])).start();
  }, [pulse]);
  return <View style={styles.mapCard}>
    <LinearGradient colors={['#1B211B', '#101512', '#0D1110']} style={StyleSheet.absoluteFill} />
    <View style={[styles.mapContour, styles.contourOne]} />
    <View style={[styles.mapContour, styles.contourTwo]} />
    <View style={[styles.mapContour, styles.contourThree]} />
    <View style={[styles.mapRoad, styles.roadOne]} />
    <View style={[styles.mapRoad, styles.roadTwo]} />
    <View style={[styles.mapRoad, styles.roadThree]} />
    <Text style={[styles.mapPlace, { top: 36, left: 28 }]}>JAYA ONE</Text>
    <Text style={[styles.mapPlace, { top: 90, right: 28 }]}>SS2</Text>
    <Text style={[styles.mapPlace, { bottom: 37, left: 95 }]}>TAMAN SEA</Text>
    <View style={[styles.restaurantPin, { top: 78, left: screenWidth * 0.24, backgroundColor: COLORS.copper }]}><View style={styles.pinCore} /></View>
    <View style={[styles.restaurantPin, { top: 121, right: 76, backgroundColor: COLORS.champagne }]}><View style={styles.pinCore} /></View>
    <Animated.View style={[styles.currentLocation, { transform: [{ scale: pulse }] }]}><View style={styles.currentLocationCore} /></Animated.View>
    <View style={styles.mapHeader}><View><Text style={styles.overline}>NEARBY TONIGHT</Text><Text style={styles.mapTitle}>A small radius.<Text style={styles.mapTitleAccent}> Better choices.</Text></Text></View><Pressable onPress={onOpenConcierge} style={styles.mapFilter}><Icon name="sliders" size={16} color={COLORS.champagne} /></Pressable></View>
    <View style={styles.mapFooter}><View style={styles.locationPill}><Icon name="map-pin" size={13} color={COLORS.champagne} /><Text style={styles.locationPillText}>Petaling Jaya</Text></View><Text style={styles.spotCount}>24 spots · 3 km</Text></View>
  </View>;
}

function RestaurantRail() {
  return <View style={styles.railSection}><View style={styles.sectionRow}><View><Text style={styles.overline}>CURATED SHORTLIST</Text><Text style={styles.sectionTitle}>Good for right now</Text></View><Pressable><Text style={styles.seeAll}>See all <Icon name="arrow-up-right" size={13} color={COLORS.champagne} /></Text></Pressable></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railContent}>
    {restaurants.map((place) => <Pressable key={place.name} style={styles.placeCard}><Image source={{ uri: place.image }} style={styles.placeImage} /><LinearGradient colors={['transparent', 'rgba(8,11,9,.9)']} style={StyleSheet.absoluteFill} /><View style={[styles.placeAccent, { backgroundColor: place.accent }]} /><View style={styles.placeRating}><Icon name="star" size={10} color={COLORS.champagne} /><Text>{place.rating}</Text></View><View style={styles.placeInfo}><Text style={styles.placeName}>{place.name}</Text><Text style={styles.placeType}>{place.type}</Text><Text style={styles.placeMeta}>{place.meta}</Text></View></Pressable>)}
  </ScrollView></View>;
}

function Concierge({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  return <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}><KeyboardAvoidingView style={styles.modalRoot} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><Pressable style={styles.modalDismiss} onPress={onClose} /><BlurView intensity={38} tint="dark" style={styles.conciergeSheet}><View style={styles.sheetHandle} /><View style={styles.sheetHeader}><View><Text style={styles.overline}>MAKANWHAT CONCIERGE</Text><Text style={styles.sheetTitle}>Let’s find your yes.</Text></View><Pressable onPress={onClose} style={styles.closeButton}><Icon name="x" size={18} color={COLORS.muted} /></Pressable></View><View style={styles.conciergeIntro}><View style={styles.conciergeOrb}><Icon name="sparkles" size={18} color={COLORS.champagne} /></View><View style={{ flex: 1 }}><Text style={styles.conciergeText}>Tell me the mood, budget, or craving. I’ll make the shortlist feel effortless.</Text><Text style={styles.conciergeMeta}>READY WHEN YOU ARE</Text></View></View><View style={styles.suggestionRow}><Pressable onPress={() => setQuery('Something cosy under RM20')} style={styles.suggestion}><Text>cosy · under RM20</Text></Pressable><Pressable onPress={() => setQuery('A quiet cafe nearby')} style={styles.suggestion}><Text>quiet cafe</Text></Pressable></View><View style={styles.conciergeInput}><TextInput value={query} onChangeText={setQuery} placeholder="What are you in the mood for?" placeholderTextColor={COLORS.quiet} style={styles.input} autoFocus /><Pressable onPress={onClose} style={styles.sendButton}><Icon name="arrow-up-right" size={17} color={COLORS.canvas} /></Pressable></View></BlurView></KeyboardAvoidingView></Modal>;
}

export default function Home() {
  const [tab, setTab] = useState('explore');
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const intro = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(intro, { toValue: 1, duration: 850, useNativeDriver: true }).start(); }, [intro]);
  const enter = { opacity: intro, transform: [{ translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }] };
  return <View style={styles.screen}><StatusBar style="light" /><Atmosphere /><SafeAreaView style={styles.safeArea} edges={['top']}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
    <Animated.View style={enter}>
      <View style={styles.topbar}><View><Text style={styles.brand}>makan<Text style={styles.brandLight}>what</Text></Text><Text style={styles.privateLabel}>PRIVATE TABLE · 01</Text></View><View style={styles.topActions}><Pressable style={styles.iconButton}><Icon name="bell" size={18} color={COLORS.muted} /><View style={styles.alertDot} /></Pressable><View style={styles.avatar}><Text>TC</Text></View></View></View>
      {tab === 'explore' ? <>
        <View style={styles.greeting}><Text style={styles.overline}>FRIDAY EVENING · PETALING JAYA</Text><Text style={styles.heroTitle}>Dinner, but make it<Text style={styles.heroAccent}> intentional.</Text></Text><Text style={styles.heroCopy}>A little less scrolling. A much better table.</Text></View>
        <Pressable onPress={() => setConciergeOpen(true)} style={styles.searchBar}><View style={styles.searchIcon}><Icon name="sparkles" size={17} color={COLORS.champagne} /></View><Text style={styles.searchText}>Ask for a mood, not a menu...</Text><View style={styles.searchArrow}><Icon name="arrow-up-right" size={15} color={COLORS.canvas} /></View></Pressable>
        <DiscoveryMap onOpenConcierge={() => setConciergeOpen(true)} />
        <RestaurantRail />
        <GlassCard style={styles.ritualCard}><View style={styles.ritualIcon}><Icon name="moon" size={16} color={COLORS.champagne} /></View><View style={styles.ritualCopy}><Text style={styles.overline}>YOUR EVENING RITUAL</Text><Text style={styles.ritualTitle}>You spend 42% less time deciding when you start with a feeling.</Text></View><Icon name="chevron-right" size={17} color={COLORS.muted} /></GlassCard>
      </> : <View style={styles.placeholder}><Text style={styles.overline}>{tab === 'calendar' ? 'YOUR MONTH IN BITES' : tab === 'activity' ? 'YOUR TASTE TRAIL' : 'YOUR FOOD COMPASS'}</Text><Text style={styles.placeholderTitle}>{tab === 'calendar' ? 'Keep the little things visible.' : tab === 'activity' ? 'Places worth revisiting.' : 'Make it feel more like you.'}</Text><Text style={styles.placeholderCopy}>This mobile foundation is ready for the next native screen.</Text></View>}
    </Animated.View>
  </ScrollView></SafeAreaView><Pressable onPress={() => setConciergeOpen(true)} style={styles.conciergeFloat}><LinearGradient colors={['#E7CB91', '#B68B5D']} style={styles.conciergeFloatGradient}><Icon name="sparkles" size={19} color={COLORS.canvas} /></LinearGradient><View style={styles.conciergeLiveDot} /></Pressable><View style={styles.bottomNav}><NavItem icon="compass" label="Explore" active={tab === 'explore'} onPress={() => setTab('explore')} /><NavItem icon="calendar" label="Calendar" active={tab === 'calendar'} onPress={() => setTab('calendar')} /><NavItem icon="bookmark" label="Saved" active={tab === 'activity'} onPress={() => setTab('activity')} /><NavItem icon="user" label="Profile" active={tab === 'profile'} onPress={() => setTab('profile')} /></View><Concierge visible={conciergeOpen} onClose={() => setConciergeOpen(false)} /></View>;
}

function NavItem({ icon, label, active, onPress }: { icon: IconName; label: string; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.navItem}><View style={[styles.navIcon, active && styles.navIconActive]}><Icon name={icon} size={18} color={active ? COLORS.canvas : COLORS.muted} /></View><Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.canvas },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 130 },
  atmosphereOne: { position: 'absolute', top: -140, right: -110, width: 340, height: 340, borderRadius: 170, backgroundColor: 'rgba(185, 147, 83, .12)', transform: [{ rotate: '20deg' }] },
  atmosphereTwo: { position: 'absolute', top: 330, left: -160, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(72, 88, 63, .16)' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, paddingBottom: 20 },
  brand: { color: COLORS.ink, fontSize: 20, fontWeight: '700', letterSpacing: -0.7 },
  brandLight: { fontWeight: '400' },
  privateLabel: { color: COLORS.quiet, fontSize: 8, letterSpacing: 1.5, marginTop: 4 },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.line, borderRadius: 17, backgroundColor: 'rgba(255,255,255,.04)' },
  alertDot: { position: 'absolute', top: 7, right: 7, width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.champagne },
  avatar: { width: 35, height: 35, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#B7A47A' },
  avatarText: { color: COLORS.canvas },
  greeting: { paddingTop: 20, paddingBottom: 18 },
  overline: { color: COLORS.quiet, fontSize: 9, letterSpacing: 1.35, fontWeight: '600' },
  heroTitle: { maxWidth: 330, marginTop: 13, color: COLORS.ink, fontSize: 45, lineHeight: 45, letterSpacing: -2.4, fontWeight: '600' },
  heroAccent: { color: COLORS.champagne, fontStyle: 'italic', fontWeight: '400' },
  heroCopy: { marginTop: 13, color: COLORS.muted, fontSize: 13, letterSpacing: .1 },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 7, paddingLeft: 13, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(214,183,122,.32)', borderRadius: 16, backgroundColor: 'rgba(255,255,255,.065)' },
  searchIcon: { width: 29, alignItems: 'center' },
  searchText: { flex: 1, color: '#AAA69B', fontSize: 12 },
  searchArrow: { width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: COLORS.champagne },
  mapCard: { height: 350, overflow: 'hidden', borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,.13)', backgroundColor: '#151C17', shadowColor: '#000', shadowOpacity: .34, shadowRadius: 30, shadowOffset: { width: 0, height: 18 }, elevation: 8 },
  mapHeader: { position: 'absolute', top: 18, left: 18, right: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  mapTitle: { marginTop: 8, color: COLORS.ink, fontSize: 19, fontWeight: '600', letterSpacing: -.6 },
  mapTitleAccent: { color: COLORS.champagne, fontStyle: 'italic', fontWeight: '400' },
  mapFilter: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(214,183,122,.25)', borderRadius: 12, backgroundColor: 'rgba(0,0,0,.2)' },
  mapContour: { position: 'absolute', borderWidth: 1, borderColor: 'rgba(184,193,165,.15)', borderRadius: 999 },
  contourOne: { width: 310, height: 190, top: 110, left: -50, transform: [{ rotate: '18deg' }] },
  contourTwo: { width: 340, height: 220, top: 90, right: -100, transform: [{ rotate: '-25deg' }] },
  contourThree: { width: 260, height: 170, bottom: -30, left: 35, transform: [{ rotate: '-12deg' }] },
  mapRoad: { position: 'absolute', height: 1, backgroundColor: 'rgba(245,239,229,.2)' },
  roadOne: { width: 440, top: 180, left: -70, transform: [{ rotate: '23deg' }] },
  roadTwo: { width: 400, top: 180, left: 50, transform: [{ rotate: '-58deg' }] },
  roadThree: { width: 360, top: 100, left: -8, transform: [{ rotate: '72deg' }] },
  mapPlace: { position: 'absolute', color: 'rgba(235,230,216,.4)', fontSize: 8, letterSpacing: 1 },
  restaurantPin: { position: 'absolute', width: 20, height: 20, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: .5, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } },
  pinCore: { width: 6, height: 6, borderRadius: 4, backgroundColor: COLORS.canvas },
  currentLocation: { position: 'absolute', top: 164, left: screenWidth * .55, width: 34, height: 34, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(214,183,122,.5)', backgroundColor: 'rgba(214,183,122,.1)' },
  currentLocationCore: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.champagne },
  mapFooter: { position: 'absolute', bottom: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 9, backgroundColor: 'rgba(0,0,0,.3)' },
  locationPillText: { color: COLORS.ink, fontSize: 10 },
  spotCount: { color: COLORS.muted, fontSize: 10 },
  railSection: { marginTop: 30 },
  sectionRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  sectionTitle: { marginTop: 8, color: COLORS.ink, fontSize: 21, letterSpacing: -.8, fontWeight: '600' },
  seeAll: { color: COLORS.champagne, fontSize: 10 },
  railContent: { gap: 12, paddingTop: 15, paddingBottom: 5 },
  placeCard: { width: 184, height: 235, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.line, borderRadius: 19, backgroundColor: COLORS.panel },
  placeImage: { width: '100%', height: '100%', position: 'absolute' },
  placeAccent: { position: 'absolute', top: 12, left: 12, width: 6, height: 6, borderRadius: 4 },
  placeRating: { position: 'absolute', top: 11, right: 11, flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 7, paddingVertical: 5, borderRadius: 7, backgroundColor: 'rgba(8,11,9,.65)' },
  placeRatingText: { color: COLORS.ink, fontSize: 9 },
  placeInfo: { position: 'absolute', bottom: 14, left: 14, right: 10 },
  placeName: { color: COLORS.ink, fontSize: 17, fontWeight: '600', letterSpacing: -.4 },
  placeType: { marginTop: 4, color: '#D1CBC0', fontSize: 10 },
  placeMeta: { marginTop: 10, color: COLORS.muted, fontSize: 9 },
  glassCard: { flexDirection: 'row', alignItems: 'center', gap: 12, overflow: 'hidden', marginTop: 19, padding: 15, borderWidth: 1, borderColor: COLORS.line, borderRadius: 17, backgroundColor: 'rgba(255,255,255,.045)' },
  ritualCard: {},
  ritualIcon: { width: 33, height: 33, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: COLORS.champagneSoft },
  ritualCopy: { flex: 1 },
  ritualTitle: { marginTop: 6, color: '#DAD6CC', fontSize: 11, lineHeight: 16 },
  conciergeFloat: { position: 'absolute', right: 22, bottom: 91, width: 58, height: 58, borderRadius: 30, shadowColor: COLORS.champagne, shadowOpacity: .22, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
  conciergeFloatGradient: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,245,220,.55)', borderRadius: 30 },
  conciergeLiveDot: { position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: 5, borderWidth: 1, borderColor: COLORS.canvas, backgroundColor: COLORS.sage },
  bottomNav: { position: 'absolute', right: 13, bottom: 13, left: 13, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,.13)', borderRadius: 21, backgroundColor: 'rgba(18,22,19,.9)' },
  navItem: { alignItems: 'center', gap: 4, minWidth: 59 },
  navIcon: { width: 31, height: 26, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  navIconActive: { backgroundColor: COLORS.champagne },
  navLabel: { color: COLORS.quiet, fontSize: 9 },
  navLabelActive: { color: COLORS.champagne },
  placeholder: { paddingTop: 100 },
  placeholderTitle: { marginTop: 14, maxWidth: 315, color: COLORS.ink, fontSize: 42, lineHeight: 43, letterSpacing: -2, fontWeight: '600' },
  placeholderCopy: { marginTop: 16, color: COLORS.muted, fontSize: 13 },
  modalRoot: { flex: 1, justifyContent: 'flex-end' },
  modalDismiss: { flex: 1, backgroundColor: 'rgba(0,0,0,.58)' },
  conciergeSheet: { minHeight: 350, padding: 20, paddingBottom: Platform.OS === 'ios' ? 31 : 20, borderTopWidth: 1, borderColor: 'rgba(255,255,255,.18)', borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: 'rgba(20,25,21,.95)' },
  sheetHandle: { alignSelf: 'center', width: 38, height: 4, marginBottom: 23, borderRadius: 2, backgroundColor: 'rgba(255,255,255,.2)' },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  sheetTitle: { marginTop: 9, color: COLORS.ink, fontSize: 25, fontWeight: '600', letterSpacing: -.9 },
  closeButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: 'rgba(255,255,255,.06)' },
  conciergeIntro: { flexDirection: 'row', gap: 12, marginTop: 30, padding: 15, borderWidth: 1, borderColor: COLORS.line, borderRadius: 16, backgroundColor: 'rgba(255,255,255,.045)' },
  conciergeOrb: { width: 31, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: COLORS.champagneSoft },
  conciergeText: { color: '#D9D4C9', fontSize: 12, lineHeight: 18 },
  conciergeMeta: { marginTop: 8, color: COLORS.quiet, fontSize: 8, letterSpacing: 1.1 },
  suggestionRow: { flexDirection: 'row', gap: 8, marginTop: 17 },
  suggestion: { paddingHorizontal: 11, paddingVertical: 9, borderWidth: 1, borderColor: 'rgba(214,183,122,.25)', borderRadius: 10, backgroundColor: 'rgba(214,183,122,.08)' },
  suggestionText: { color: COLORS.champagne, fontSize: 10 },
  conciergeInput: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 23, paddingLeft: 13, paddingRight: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,.15)', borderRadius: 14, backgroundColor: 'rgba(0,0,0,.18)' },
  input: { flex: 1, height: 46, color: COLORS.ink, fontSize: 12 },
  sendButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: COLORS.champagne },
});
