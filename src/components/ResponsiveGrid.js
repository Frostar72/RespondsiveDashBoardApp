/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  getGridColumns,
  listenForOrientationChange,
  getAdaptivePadding,
} from '../utils/responsive';
import { theme } from '../styles/theme';
const ResponsiveGrid = ({
  data = [],
  renderItem,
  numColumns,
  spacing = theme.spacing.sm,
  contentContainerStyle,
}) => {
  const renderRow = (rowData, rowIndex) => {
    return (
      <View
        key={rowIndex}
        style={[styles.row, { gap: spacing, marginBottom: spacing }]}>
        {rowData.map((item, itemIndex) => {
          if (!item) {
            // Empty placeholder for incomplete rows
            return <View key={itemIndex} style={[styles.item, { flex: 1 }]} />;
          }
          return (
            <View
              key={item.id || itemIndex}
              style={[styles.item, { flex: 1 }]}>
              {renderItem(item, itemIndex)}
            </View>
          );
        })}
      </View>
    );
  };
  // Group data into rows
  const groupedData = [];
  for (let i = 0; i < data.length; i += numColumns) {
    const row = data.slice(i, i + numColumns);
    // Fill incomplete rows with null
    while (row.length < numColumns) {
      row.push(null);
    }
    groupedData.push(row);
  }
  return (
    <View style={[styles.container, contentContainerStyle]}>
      {groupedData.map((rowData, rowIndex) => renderRow(rowData, rowIndex))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getAdaptivePadding(),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: theme.spacing.sm,
  },
  item: {
    // Base item styles
  },
});
export default ResponsiveGrid;