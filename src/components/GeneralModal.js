import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';

export default function GeneralModal({ visible, onClose, children }) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.modalBackground}>
                <View style={[styles.contentContainer]}>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentContainer: {
        width: '90%',
        height: '50%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
});
