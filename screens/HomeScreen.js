import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';


export default function HomeScreen({ navigation, onLogout }) {

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    Alert.alert(

      'Logout',

      'Apakah Anda yakin ingin keluar dari aplikasi?',

      [

        {
          text: 'Batal',
          style: 'cancel',
        },

        {
          text: 'Logout',
          style: 'destructive',

          onPress: onLogout,
        },

      ]

    );

  };


  // ==========================================
  // MENU
  // ==========================================

  const menuItems = [

    {
      id: '1',
      icon: '📚',
      title: 'Mata Kuliah',
      description: 'Lihat dan kelola mata kuliah',
    },

    {
      id: '2',
      icon: '📝',
      title: 'Nilai',
      description: 'Lihat nilai dan IP semester',
    },

    {
      id: '3',
      icon: '📅',
      title: 'Jadwal',
      description: 'Lihat jadwal perkuliahan',
    },

    {
      id: '4',
      icon: '👤',
      title: 'Profil',
      description: 'Kelola profil mahasiswa',
    },

  ];


  // ==========================================
  // MENU PRESS
  // ==========================================

  const handleMenuPress = (title) => {

    Alert.alert(
      title,
      `Silakan pilih menu "${title}" melalui navigasi di bawah.`
    );

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <View style={styles.header}>

        <View>

          <Text style={styles.greeting}>
            Selamat Datang 👋
          </Text>

          <Text style={styles.studentName}>
            Siti Nuraeni Muffidah
          </Text>

          <Text style={styles.nim}>
            202413008 • Sistem Informasi
          </Text>

        </View>


        <View style={styles.headerIcon}>

          <Text style={styles.headerIconText}>
            🎓
          </Text>

        </View>

      </View>


      {/* =====================================
          WELCOME CARD
      ===================================== */}

      <View style={styles.welcomeCard}>

        <View style={styles.welcomeContent}>

          <Text style={styles.welcomeTitle}>
            StudentApp
          </Text>

          <Text style={styles.welcomeText}>
            Kelola informasi akademik Anda
            dengan mudah dalam satu aplikasi.
          </Text>

        </View>


        <Text style={styles.welcomeEmoji}>
          🎓
        </Text>

      </View>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <Text style={styles.sectionTitle}>
        Ringkasan Akademik
      </Text>


      <View style={styles.statsContainer}>

        {/* SKS */}

        <View style={styles.statCard}>

          <View style={styles.statIconBlue}>

            <Text style={styles.statIconText}>
              📚
            </Text>

          </View>

          <Text style={styles.statValue}>
            21
          </Text>

          <Text style={styles.statLabel}>
            Total SKS
          </Text>

        </View>


        {/* IP */}

        <View style={styles.statCard}>

          <View style={styles.statIconGreen}>

            <Text style={styles.statIconText}>
              ⭐
            </Text>

          </View>

          <Text style={styles.statValue}>
            3.72
          </Text>

          <Text style={styles.statLabel}>
            IP Semester
          </Text>

        </View>


        {/* MATA KULIAH */}

        <View style={styles.statCard}>

          <View style={styles.statIconPurple}>

            <Text style={styles.statIconText}>
              📖
            </Text>

          </View>

          <Text style={styles.statValue}>
            7
          </Text>

          <Text style={styles.statLabel}>
            Mata Kuliah
          </Text>

        </View>

      </View>


      {/* =====================================
          MENU AKADEMIK
      ===================================== */}

      <View style={styles.sectionHeader}>

        <Text style={styles.sectionTitle}>
          Menu Akademik
        </Text>

      </View>


      <View style={styles.menuContainer}>

        {menuItems.map((item) => (

          <Pressable

            key={item.id}

            style={({ pressed }) => [

              styles.menuCard,

              pressed &&
                styles.menuCardPressed,

            ]}

            onPress={() => {
              if (item.title === 'Mata Kuliah') {
                navigation.navigate('Courses');
              } else {
                handleMenuPress(item.title);
              }
            }}

          >

            {/* ICON */}

            <View style={styles.menuIcon}>

              <Text style={styles.menuIconText}>
                {item.icon}
              </Text>

            </View>


            {/* INFO */}

            <View style={styles.menuInfo}>

              <Text style={styles.menuTitle}>
                {item.title}
              </Text>

              <Text style={styles.menuDescription}>
                {item.description}
              </Text>

            </View>


            {/* ARROW */}

            <Text style={styles.menuArrow}>
              ›
            </Text>

          </Pressable>

        ))}

      </View>


      {/* =====================================
          QUICK INFORMATION
      ===================================== */}

      <Text style={styles.sectionTitle}>
        Informasi Akademik
      </Text>


      <View style={styles.infoCard}>

        <View style={styles.infoRow}>

          <View style={styles.infoIcon}>

            <Text>
              📅
            </Text>

          </View>

          <View style={styles.infoContent}>

            <Text style={styles.infoTitle}>
              Semester Aktif
            </Text>

            <Text style={styles.infoValue}>
              Semester 5 • Tahun Akademik 2026/2027
            </Text>

          </View>

        </View>


        <View style={styles.divider} />


        <View style={styles.infoRow}>

          <View style={styles.infoIcon}>

            <Text>
              🏫
            </Text>

          </View>

          <View style={styles.infoContent}>

            <Text style={styles.infoTitle}>
              Program Studi
            </Text>

            <Text style={styles.infoValue}>
              S1 Teknik Informatika
            </Text>

          </View>

        </View>


        <View style={styles.divider} />


        <View style={styles.infoRow}>

          <View style={styles.infoIcon}>

            <Text>
              🎓
            </Text>

          </View>

          <View style={styles.infoContent}>

            <Text style={styles.infoTitle}>
              Institusi
            </Text>

            <Text style={styles.infoValue}>
              STITEK Bontang
            </Text>

          </View>

        </View>

      </View>


      {/* =====================================
          MOTIVATION
      ===================================== */}

      <View style={styles.quoteCard}>

        <Text style={styles.quoteIcon}>
          “
        </Text>

        <Text style={styles.quoteText}>
          Belajar, Berkembang, Berdampak.
        </Text>

        <Text style={styles.quoteAuthor}>
          — StudentApp
        </Text>

      </View>


      {/* =====================================
          LOGOUT
      ===================================== */}

      <Pressable

        style={({ pressed }) => [

          styles.logoutButton,

          pressed &&
            styles.logoutPressed,

        ]}

        onPress={handleLogout}

      >

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </Pressable>


      {/* =====================================
          FOOTER
      ===================================== */}

      <Text style={styles.footer}>
        StudentApp • STITEK Bontang
      </Text>

      <Text style={styles.version}>
        Versi 1.0.0
      </Text>

    </ScrollView>

  );

}


// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({

  // ================================================
  // CONTAINER
  // ================================================

  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },


  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 100,
  },


  // ================================================
  // HEADER
  // ================================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },


  greeting: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 3,
  },


  studentName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },


  nim: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
  },


  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },


  headerIconText: {
    fontSize: 28,
  },


  // ================================================
  // WELCOME CARD
  // ================================================

  welcomeCard: {
    minHeight: 145,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },


  welcomeContent: {
    flex: 1,
    paddingRight: 10,
  },


  welcomeTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },


  welcomeText: {
    color: '#dbeafe',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },


  welcomeEmoji: {
    fontSize: 55,
  },


  // ================================================
  // SECTION
  // ================================================

  sectionHeader: {
    marginBottom: 12,
  },


  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },


  // ================================================
  // STATISTICS
  // ================================================

  statsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },


  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },


  statIconBlue: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },


  statIconGreen: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },


  statIconPurple: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },


  statIconText: {
    fontSize: 18,
  },


  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },


  statLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 3,
    textAlign: 'center',
  },


  // ================================================
  // MENU
  // ================================================

  menuContainer: {
    marginBottom: 25,
  },


  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },


  menuCardPressed: {
    opacity: 0.7,
    transform: [
      {
        scale: 0.99,
      },
    ],
  },


  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },


  menuIconText: {
    fontSize: 23,
  },


  menuInfo: {
    flex: 1,
  },


  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },


  menuDescription: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
  },


  menuArrow: {
    fontSize: 30,
    color: '#94a3b8',
    marginLeft: 8,
  },


  // ================================================
  // INFORMATION
  // ================================================

  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 17,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },


  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },


  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },


  infoContent: {
    flex: 1,
  },


  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },


  infoValue: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },


  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },


  // ================================================
  // QUOTE
  // ================================================

  quoteCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 17,
    padding: 20,
    marginBottom: 20,
  },


  quoteIcon: {
    fontSize: 35,
    color: '#2563eb',
    fontWeight: '800',
    lineHeight: 30,
  },


  quoteText: {
    fontSize: 17,
    color: '#1e3a8a',
    fontWeight: '700',
    fontStyle: 'italic',
    marginTop: 4,
  },


  quoteAuthor: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },


  // ================================================
  // LOGOUT
  // ================================================

    logoutButton: {
    height: 50,
    borderRadius: 13,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    },

    logoutPressed: {
    opacity: 0.8,
    },

    logoutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    },


  // ================================================
  // FOOTER
  // ================================================

  footer: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 5,
  },


  version: {
    textAlign: 'center',
    color: '#cbd5e1',
    fontSize: 10,
    marginTop: 4,
  },

});