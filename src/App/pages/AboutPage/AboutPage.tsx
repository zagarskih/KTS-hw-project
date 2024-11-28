import React, { useEffect } from 'react';
import { Text, Button, Layout } from 'components';
import classNames from 'classnames';
import { TeamConfig } from 'config/team';
import useIsMobile from 'hooks/useIsMobile';

import styles from './AboutPage.module.scss';
import aboutPhoto from 'assets/images/aboutPhoto.png';
import call from 'assets/icons/call.svg';
import consultation from 'assets/icons/consultation.svg';
import guarantee from 'assets/icons/guarantee.svg';

const AboutPage: React.FC = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout className={styles.root} isMobile={isMobile}>
      <div className={styles.content}>
        <div className={styles.text}>
          <Text className={styles.title} view="title">
            About Us
          </Text>
          <Text className={styles.description} view="p20" color="secondary">
            We are dedicated to bringing you the finest products, combining quality, innovation, and style to enhance
            your everyday life
          </Text>
        </div>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={aboutPhoto} alt="about us image" />
        </div>

        <div className={styles.missionContainer}>
          <div className={styles.leftSide}>
            <Text view="p16" weight="bold" color="accent">
              Our Mission
            </Text>
            <Text weight="medium" className={styles.titleSecondary}>
              Our team dedicated to help find exactly what you need
            </Text>

            <div className={styles.numbers}>
              <div className={styles.number}>
                <Text className={styles.titleSecondary} weight="medium">
                  20+
                </Text>
                <Text view="p16" color="secondary">
                  Years Experience
                </Text>
              </div>
              <div className={styles.number}>
                <Text className={styles.titleSecondary} weight="medium">
                  483
                </Text>
                <Text view="p16" color="secondary">
                  Happy Client
                </Text>
              </div>
              <div className={styles.number}>
                <Text className={styles.titleSecondary} weight="medium">
                  150+
                </Text>
                <Text view="p16" color="secondary">
                  Project Finished
                </Text>
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.info}>
              <img src={call} />
              <div className={styles.infoText}>
                <Text view="p20" weight="bold">
                  24/7 Supports
                </Text>
                <Text view="p16" color="secondary">
                  24/7 support means a support service that is provided 24 hours a day and 7 days a week.
                </Text>
              </div>
            </div>
            <div className={styles.info}>
              <img src={consultation} />
              <div className={styles.infoText}>
                <Text view="p20" weight="bold">
                  Free Consultation
                </Text>
                <Text view="p16" color="secondary">
                  A free consultation is a one-on-one interaction or conversation given freely to share one's thoughts
                  and discuss possible.
                </Text>
              </div>
            </div>
            <div className={styles.info}>
              <img src={guarantee} />
              <div className={styles.infoText}>
                <Text view="p20" weight="bold">
                  Overall Guarantee
                </Text>
                <Text view="p16" color="secondary">
                  The comprehensive guarantee is required for import, warehousing, transit, processing and specific use.
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.teamContainer}>
          <Text view="p16" weight="bold" color="accent">
            Our Team
          </Text>
          <div className={styles.teamText}>
            <Text className={classNames(styles.titleSecondary, styles.teamTitle)} weight="medium">
              Meet our leading and strong team
            </Text>
            <Text className={styles.teamSubtitle} view="p16" color="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum suscipit arcu, vitae tristique
              risus bibendum id. Aenean ultricies nisl vel erat aliquet, sit amet euismod odio mollis.
            </Text>
          </div>
          <div className={styles.teamCards}>
            {TeamConfig.map((p) => {
              return (
                <div className={styles.teamCard}>
                  <div className={styles.teamImgContainer}>
                    <img className={styles.teamImg} key={p.id} src={p.image} alt={p.name} />
                  </div>
                  <Text className={styles.teamCardName} view="p20" weight="medium">
                    {p.name}
                  </Text>
                  <Text view="p16" color="secondary">
                    {p.role}
                  </Text>
                </div>
              );
            })}
          </div>
          <div className={styles.workWithUs}>
            <Text className={styles.titleSecondary} weight="medium">
              Are you interested work with us?
            </Text>
            <Button>Let's talk</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
