import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { delay } from '../../helper/general';
import LoaderScreen from '../../components/Loader/LoaderScreen';
import ContentScreen from '../../components/Content/ContentScreen';

const BlankPage: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const [isError, setIsError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initialized = useRef<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const populate = async () => {
        await delay(2000);
        return [];
      };
      populate()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setIsError('loading');
        });
    }
  }, []);

  if (isError === 'loading') {
    navigate('/error', {
      state: {
        status: 600,
        title: 'Loading failed',
        description: 'Failed to load data!',
      },
    });
  }

  if (isLoading) {
    return <LoaderScreen text="Loading" />;
  }

  return (
    <ContentScreen title={title} description={description}>
      <div />
    </ContentScreen>
  );
};

export default BlankPage;
