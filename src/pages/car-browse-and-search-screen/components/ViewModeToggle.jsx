import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViewModeToggle = ({ viewMode, onViewModeChange, language }) => {
  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: language === 'ar' ? 'شبكة' : 'Grid' },
    { value: 'list', icon: 'List', label: language === 'ar' ? 'قائمة' : 'List' },
    { value: 'compact', icon: 'LayoutGrid', label: language === 'ar' ? 'مدمج' : 'Compact' }
  ];

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {viewModes.map((mode) => (
        <Button
          key={mode.value}
          variant={viewMode === mode.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange(mode.value)}
          className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5"
          title={mode.label}
        >
          <Icon name={mode.icon} size={16} />
          <span className="hidden sm:inline text-xs">{mode.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ViewModeToggle;