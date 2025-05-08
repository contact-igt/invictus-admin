import React, { useRef, useEffect, useState } from 'react';
import { useField, useFormikContext, FormikValues } from 'formik';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import AppErrorMessage from 'components/common/Forms/AppErrorMessage';

interface Props {
  name: string;
  maxCount?: number;
  itemSize?: number;
  placeholderIcon?: string;
}

const AppFormMultiImagePicker: React.FC<Props> = ({
  name,
  maxCount = 5,
  itemSize = 100,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFieldValue } = useFormikContext<FormikValues>();
  const [field, meta] = useField<Array<File | string>>(name);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls: string[] = [];
    const objectUrls: string[] = [];

    (field.value || []).forEach((item) => {
      if (item instanceof File) {
        const url = URL.createObjectURL(item);
        objectUrls.push(url);
        urls.push(url);
      } else if (typeof item === 'string' && item) {
        urls.push(item);
      }
    });

    setPreviews(urls);
    return () => objectUrls.forEach((u) => URL.revokeObjectURL(u));
  }, [field.value]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const existing = field.value || [];
    const newFiles = Array.from(files).slice(0, maxCount - existing.length);
    setFieldValue(name, existing.concat(newFiles));
  };

  const handleRemove = (index: number) => {
    const arr = [...(field.value || [])];
    arr.splice(index, 1);
    setFieldValue(name, arr);
  };

  const showError = Boolean(meta.touched && meta.error);

  return (
    <Box mt={2} mb={3}>
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <Box
        display="flex"
        alignItems="center"
        overflow="auto"
        sx={{ '&::-webkit-scrollbar': { height: 8 } }}
      >
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            width: itemSize,
            height: itemSize,
            border: '2px dashed',
            borderColor: 'grey.400',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flex: '0 0 auto',
            mr: 1,
            bgcolor: 'background.paper',
          }}
        >
          <IconifyIcon icon="mdi-plus" width={24} height={24} />
          <Typography variant="caption" mt={0.5}>
            Upload
          </Typography>
        </Box>

        {previews.map((src, idx) => (
          <Box
            key={`${src}-${idx}`}
            position="relative"
            sx={{
              width: itemSize,
              height: itemSize,
              flex: '0 0 auto',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 1,
              overflow: 'hidden',
              mr: 1,
            }}
          >
            <img
              src={src}
              alt={`preview-${idx}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <IconButton
              size="small"
              onClick={() => handleRemove(idx)}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
              }}
            >
              <IconifyIcon icon="mdi-close" color={'primary.main'} width={16} height={16} />
            </IconButton>
          </Box>
        ))}
      </Box>

      <AppErrorMessage error={meta.error as string} visible={showError} />
    </Box>
  );
};

export default AppFormMultiImagePicker;
