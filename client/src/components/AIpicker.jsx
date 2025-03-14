import React from 'react';
import CustomButton from './CustomButton';

const AIpicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className='aipicker-container'>
      <textarea
        placeholder="LETS CREATE TOGETHER"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='aipicker-textarea'
      />

      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyle="text-xs"
          />
        ) : (<>
          <CustomButton
            type="outline"
            title="AI Logo"
            handleOnClick={() => handleSubmit('logo')}
            customStyle="text-xs"
          />
          <CustomButton
            type="filled"
            title="AI Full"
            handleOnClick={() => handleSubmit('full')}
            customStyle="text-xs"
          />
          </>
        )}
      </div>
    </div>
  );
};

export default AIpicker;