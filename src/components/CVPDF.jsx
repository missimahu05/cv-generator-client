import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Styles pour le PDF
const createStyles = (primaryColor, template) => {
  const baseStyles = {
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 20,
      textAlign: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: primaryColor,
    },
    title: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
    },
    contactRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      fontSize: 10,
      color: '#666',
    },
    contactItem: {
      marginHorizontal: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: primaryColor,
      marginTop: 15,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 5,
    },
    experienceItem: {
      marginBottom: 12,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    experienceCompany: {
      fontSize: 10,
      color: '#666',
      marginTop: 2,
    },
    experienceDate: {
      fontSize: 9,
      color: '#999',
      marginTop: 2,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
    },
    skill: {
      padding: '4 8',
      marginRight: 5,
      marginBottom: 5,
      backgroundColor: `${primaryColor}20`,
      color: primaryColor,
      fontSize: 9,
      borderRadius: 3,
    },
  };

  // Variations selon le template
  switch (template) {
    case 'classic':
      return StyleSheet.create({
        ...baseStyles,
        name: { ...baseStyles.name, fontFamily: 'Times-Roman' },
        title: { ...baseStyles.title, fontFamily: 'Times-Roman' },
        page: { ...baseStyles.page, padding: 40 },
      });

    case 'minimal':
      return StyleSheet.create({
        ...baseStyles,
        name: { ...baseStyles.name, fontWeight: 'light', fontSize: 28 },
        title: { ...baseStyles.title, color: '#aaa' },
        sectionTitle: { ...baseStyles.sectionTitle, borderBottomWidth: 0, fontWeight: 'light' },
      });

    default: // modern
      return StyleSheet.create(baseStyles);
  }
};

const CVPDF = ({ data }) => {
  const styles = createStyles(
    data.parametres?.couleurPrincipale || '#2563eb',
    data.parametres?.template || 'modern'
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personnel?.nomComplet || 'Nom complet'}</Text>
          <Text style={styles.title}>{data.personnel?.titrePoste || 'Titre du poste'}</Text>

          <View style={styles.contactRow}>
            {data.personnel?.email && (
              <Text style={styles.contactItem}>📧 {data.personnel.email}</Text>
            )}
            {data.personnel?.telephone && (
              <Text style={styles.contactItem}>📞 {data.personnel.telephone}</Text>
            )}
          </View>
        </View>

        {/* Experience Section */}
        {data.experiences?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
            {data.experiences.map((exp, index) => (
              <View key={exp.id || index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{exp.poste}</Text>
                <Text style={styles.experienceCompany}>{exp.entreprise}</Text>
                <Text style={styles.experienceDate}>
                  {exp.dateDebut} - {exp.dateFin}
                </Text>
                {exp.description && (
                  <Text style={{ fontSize: 9, marginTop: 4, color: '#444' }}>
                    {exp.description}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}

        {/* Skills Section */}
        {data.competences?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.skillsContainer}>
              {data.competences.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default CVPDF;