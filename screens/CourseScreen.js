import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = '@student_app_courses';


const initialCourses = [
  {
    id: '1',
    code: 'TI536',
    name: 'Pemrograman Berbasis Framework',
    sks: 3,
    category: 'Wajib',
    lecturer: 'Fiky Anggara, S.Kom., M.Kom.',
  },

  {
    id: '2',
    code: 'TI533',
    name: 'Keamanan Data dan Informasi',
    sks: 3,
    category: 'Wajib',
    lecturer: 'Fiky Anggara, S.Kom., M.Kom.',
  },

  {
    id: '3',
    code: 'TI430',
    name: 'Pemrograman Web',
    sks: 3,
    category: 'Wajib',
    lecturer: 'Fiky Anggara, S.Kom., M.Kom.',
  },

  {
    id: '4',
    code: 'TI428',
    name: 'Kecerdasan Komputasional',
    sks: 3,
    category: 'Pilihan',
    lecturer: 'Dosen Pengampu',
  },

  {
    id: '5',
    code: 'MA312',
    name: 'Matematika Diskrit',
    sks: 3,
    category: 'Wajib',
    lecturer: 'Dosen Pengampu',
  },

  {
    id: '6',
    code: 'TI540',
    name: 'Pemrograman Aplikasi Bergerak',
    sks: 3,
    category: 'Pilihan',
    lecturer: 'Dosen Pengampu',
  },
];


export default function CourseScreen() {

  // =====================================
  // STATE
  // =====================================

  const [courses, setCourses] =
    useState(initialCourses);

  const [search, setSearch] =
    useState('');

  const [category, setCategory] =
    useState('Semua');

  const [modalVisible, setModalVisible] =
    useState(false);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [code, setCode] =
    useState('');

  const [name, setName] =
    useState('');

  const [sks, setSks] =
    useState('');

  const [lecturer, setLecturer] =
    useState('');

  const [courseCategory, setCourseCategory] =
    useState('Wajib');


  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    loadCourses();

  }, []);


  const loadCourses = async () => {

    try {

      const savedCourses =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );


      if (savedCourses !== null) {

        setCourses(
          JSON.parse(savedCourses)
        );

      }

    } catch (error) {

      console.log(
        'Gagal mengambil data:',
        error
      );

    }

  };


  // =====================================
  // SAVE DATA
  // =====================================

  const saveCoursesToStorage = async (data) => {

    try {

      await AsyncStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

      );

      console.log(
        'Data berhasil disimpan'
      );

    } catch (error) {

      console.log(
        'Gagal menyimpan data:',
        error
      );

    }

  };


  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {

    setCode('');

    setName('');

    setSks('');

    setLecturer('');

    setCourseCategory('Wajib');

    setEditingCourse(null);

  };


  // =====================================
  // TAMBAH
  // =====================================

  const openAddModal = () => {

    resetForm();

    setModalVisible(true);

  };


  // =====================================
  // EDIT
  // =====================================

  const openEditModal = (course) => {

    setEditingCourse(course);

    setCode(course.code);

    setName(course.name);

    setSks(String(course.sks));

    setLecturer(course.lecturer);

    setCourseCategory(course.category);

    setModalVisible(true);

  };


  // =====================================
  // CREATE / UPDATE
  // =====================================

  const saveCourse = async () => {

    if (
      code.trim() === '' ||
      name.trim() === '' ||
      sks.trim() === '' ||
      lecturer.trim() === ''
    ) {

      Alert.alert(
        'Data Belum Lengkap',
        'Semua field harus diisi.'
      );

      return;

    }


    const sksNumber = Number(sks);


    if (
      Number.isNaN(sksNumber) ||
      sksNumber <= 0
    ) {

      Alert.alert(
        'SKS Tidak Valid',
        'Jumlah SKS harus berupa angka lebih dari 0.'
      );

      return;

    }


    // =================================
    // UPDATE
    // =================================

    if (editingCourse) {

      const updatedCourses =
        courses.map((course) => {

          if (
            course.id ===
            editingCourse.id
          ) {

            return {

              ...course,

              code:
                code
                  .trim()
                  .toUpperCase(),

              name:
                name.trim(),

              sks:
                sksNumber,

              category:
                courseCategory,

              lecturer:
                lecturer.trim(),

            };

          }

          return course;

        });


      setCourses(updatedCourses);

      await saveCoursesToStorage(
        updatedCourses
      );


      Alert.alert(
        'Berhasil',
        'Data mata kuliah berhasil diperbarui.'
      );

    }


    // =================================
    // CREATE
    // =================================

    else {

      const newCourse = {

        id:
          Date.now().toString(),

        code:
          code
            .trim()
            .toUpperCase(),

        name:
          name.trim(),

        sks:
          sksNumber,

        category:
          courseCategory,

        lecturer:
          lecturer.trim(),

      };


      const updatedCourses = [

        ...courses,

        newCourse,

      ];


      setCourses(updatedCourses);

      await saveCoursesToStorage(
        updatedCourses
      );


      Alert.alert(
        'Berhasil',
        'Mata kuliah berhasil ditambahkan.'
      );

    }


    setModalVisible(false);

    resetForm();

  };


  // =====================================
  // DELETE
  // =====================================

  const deleteCourse = (course) => {

    Alert.alert(

      'Hapus Mata Kuliah',

      `Apakah Anda yakin ingin menghapus "${course.name}"?`,

      [

        {
          text: 'Batal',

          style: 'cancel',

        },

        {

          text: 'Hapus',

          style: 'destructive',

          onPress: async () => {

            const updatedCourses =
              courses.filter(
                (item) =>
                  item.id !== course.id
              );


            setCourses(
              updatedCourses
            );


            await saveCoursesToStorage(
              updatedCourses
            );


            Alert.alert(
              'Berhasil',
              'Mata kuliah berhasil dihapus.'
            );

          },

        },

      ]

    );

  };


  // =====================================
  // DETAIL
  // =====================================

  const showDetail = (course) => {

    Alert.alert(

      course.name,

      `Kode: ${course.code}\n` +
      `SKS: ${course.sks}\n` +
      `Kategori: ${course.category}\n` +
      `Dosen: ${course.lecturer}`

    );

  };


  // =====================================
  // SEARCH + FILTER
  // =====================================

  const filteredCourses =
    courses.filter((course) => {

      const keyword =
        search.toLowerCase();


      const matchesSearch =

        course.name
          .toLowerCase()
          .includes(keyword)

        ||

        course.code
          .toLowerCase()
          .includes(keyword);


      const matchesCategory =

        category === 'Semua'

        ||

        course.category ===
          category;


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  // =====================================
  // CARD
  // =====================================

  const renderCourse = ({ item }) => (

    <View style={styles.courseCard}>

      <Pressable
        style={styles.courseMain}
        onPress={() =>
          showDetail(item)
        }
      >

        <View style={styles.courseIcon}>

          <Text
            style={
              styles.courseIconText
            }
          >
            📚
          </Text>

        </View>


        <View
          style={styles.courseInfo}
        >

          <Text
            style={styles.courseName}
          >
            {item.name}
          </Text>


          <Text
            style={styles.courseCode}
          >
            {item.code}
          </Text>


          <View
            style={styles.courseMeta}
          >

            <Text
              style={styles.metaText}
            >
              {item.sks} SKS
            </Text>


            <Text style={styles.dot}>
              •
            </Text>


            <Text
              style={[
                styles.categoryText,

                item.category ===
                  'Wajib'
                  ? styles.wajib
                  : styles.pilihan,
              ]}
            >
              {item.category}
            </Text>

          </View>

        </View>


        <Text style={styles.arrow}>
          ›
        </Text>

      </Pressable>


      {/* ACTION */}

      <View
        style={styles.actionContainer}
      >

        <Pressable
          style={styles.editButton}
          onPress={() =>
            openEditModal(item)
          }
        >

          <Text style={styles.editText}>
            ✏️ Edit
          </Text>

        </Pressable>


        <Pressable
          style={styles.deleteButton}
          onPress={() =>
            deleteCourse(item)
          }
        >

          <Text
            style={styles.deleteText}
          >
            🗑️ Hapus
          </Text>

        </Pressable>

      </View>

    </View>

  );


  // =====================================
  // RETURN
  // =====================================

  return (

    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <View>

          <Text style={styles.title}>
            Mata Kuliah
          </Text>

          <Text
            style={styles.subtitle}
          >
            Kelola data mata kuliah
          </Text>

        </View>


        <Pressable
          style={styles.addButton}
          onPress={openAddModal}
        >

          <Text
            style={styles.addButtonText}
          >
            ＋
          </Text>

        </Pressable>

      </View>


      {/* SEARCH */}

      <View
        style={styles.searchContainer}
      >

        <Text
          style={styles.searchIcon}
        >
          🔍
        </Text>


        <TextInput
          style={styles.searchInput}
          placeholder="Cari mata kuliah atau kode..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
        />


        {search.length > 0 && (

          <Pressable
            onPress={() =>
              setSearch('')
            }
          >

            <Text
              style={styles.clearButton}
            >
              ✕
            </Text>

          </Pressable>

        )}

      </View>


      {/* FILTER */}

      <View
        style={styles.filterContainer}
      >

        {[
          'Semua',
          'Wajib',
          'Pilihan',
        ].map((item) => (

          <Pressable
            key={item}
            style={[
              styles.filterButton,

              category === item &&
                styles.filterButtonActive,
            ]}
            onPress={() =>
              setCategory(item)
            }
          >

            <Text
              style={[
                styles.filterText,

                category === item &&
                  styles.filterTextActive,
              ]}
            >
              {item}
            </Text>

          </Pressable>

        ))}

      </View>


      {/* JUMLAH DATA */}

      <Text style={styles.resultText}>

        {filteredCourses.length}{' '}
        mata kuliah ditemukan

      </Text>


      {/* LIST */}

      <FlatList

        data={filteredCourses}

        keyExtractor={(item) =>
          item.id
        }

        renderItem={renderCourse}

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.list
        }

        ListEmptyComponent={

          <View
            style={styles.emptyContainer}
          >

            <Text
              style={styles.emptyIcon}
            >
              🔎
            </Text>

            <Text
              style={styles.emptyTitle}
            >
              Data tidak ditemukan
            </Text>

            <Text
              style={styles.emptyText}
            >
              Coba gunakan kata kunci lain.
            </Text>

          </View>

        }

      />


      {/* =================================
          MODAL
      ================================= */}

      <Modal

        visible={modalVisible}

        animationType="slide"

        transparent={true}

        onRequestClose={() => {

          setModalVisible(false);

          resetForm();

        }}

      >

        <KeyboardAvoidingView

          style={styles.modalOverlay}

          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }

        >

          <View
            style={styles.modalContainer}
          >

            {/* HEADER */}

            <View
              style={styles.modalHeader}
            >

              <Text
                style={styles.modalTitle}
              >

                {editingCourse
                  ? 'Edit Mata Kuliah'
                  : 'Tambah Mata Kuliah'}

              </Text>


              <Pressable
                onPress={() => {

                  setModalVisible(false);

                  resetForm();

                }}
              >

                <Text
                  style={styles.closeButton}
                >
                  ✕
                </Text>

              </Pressable>

            </View>


            {/* KODE */}

            <Text style={styles.label}>
              Kode Mata Kuliah
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Contoh: TI430"
              placeholderTextColor="#94a3b8"
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />


            {/* NAMA */}

            <Text style={styles.label}>
              Nama Mata Kuliah
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Contoh: Pemrograman Web"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
            />


            {/* SKS */}

            <Text style={styles.label}>
              Jumlah SKS
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Contoh: 3"
              placeholderTextColor="#94a3b8"
              value={sks}
              onChangeText={setSks}
              keyboardType="numeric"
            />


            {/* DOSEN */}

            <Text style={styles.label}>
              Dosen Pengampu
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nama dosen"
              placeholderTextColor="#94a3b8"
              value={lecturer}
              onChangeText={setLecturer}
            />


            {/* KATEGORI */}

            <Text style={styles.label}>
              Kategori
            </Text>


            <View
              style={styles.categoryPicker}
            >

              {[
                'Wajib',
                'Pilihan',
              ].map((item) => (

                <Pressable
                  key={item}
                  style={[
                    styles.categoryOption,

                    courseCategory ===
                      item &&
                      styles.categoryOptionActive,
                  ]}
                  onPress={() =>
                    setCourseCategory(
                      item
                    )
                  }
                >

                  <Text
                    style={[
                      styles.categoryOptionText,

                      courseCategory ===
                        item &&
                        styles.categoryOptionTextActive,
                    ]}
                  >
                    {item}
                  </Text>

                </Pressable>

              ))}

            </View>


            {/* SAVE */}

            <Pressable
              style={styles.saveButton}
              onPress={saveCourse}
            >

              <Text
                style={styles.saveButtonText}
              >

                {editingCourse
                  ? 'Simpan Perubahan'
                  : 'Tambah Mata Kuliah'}

              </Text>

            </Pressable>

          </View>

        </KeyboardAvoidingView>

      </Modal>

    </View>

  );

}


// ==========================================
// STYLE
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 55,
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#64748b',
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 32,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 52,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  searchIcon: {
    fontSize: 19,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },

  clearButton: {
    fontSize: 17,
    color: '#64748b',
    padding: 5,
  },

  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 15,
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },

  filterButtonActive: {
    backgroundColor: '#2563eb',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },

  filterTextActive: {
    color: '#ffffff',
  },

  resultText: {
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 8,
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },

  courseMain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  courseIconText: {
    fontSize: 23,
  },

  courseInfo: {
    flex: 1,
  },

  courseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },

  courseCode: {
    marginTop: 3,
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },

  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  metaText: {
    fontSize: 12,
    color: '#64748b',
  },

  dot: {
    marginHorizontal: 6,
    color: '#94a3b8',
  },

  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },

  wajib: {
    color: '#2563eb',
  },

  pilihan: {
    color: '#7c3aed',
  },

  arrow: {
    fontSize: 30,
    color: '#94a3b8',
    marginLeft: 8,
  },

  actionContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },

  editButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#eff6ff',
  },

  deleteButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fef2f2',
  },

  editText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 13,
  },

  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 13,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },

  emptyText: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
    color: '#64748b',
  },

  // MODAL

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },

  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 30,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0f172a',
  },

  closeButton: {
    fontSize: 22,
    color: '#64748b',
    padding: 5,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 7,
    marginTop: 8,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },

  categoryPicker: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  categoryOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  categoryOptionActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },

  categoryOptionText: {
    color: '#475569',
    fontWeight: '700',
  },

  categoryOptionTextActive: {
    color: '#ffffff',
  },

  saveButton: {
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },

});