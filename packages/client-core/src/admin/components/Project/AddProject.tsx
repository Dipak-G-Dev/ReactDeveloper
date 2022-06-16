import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { GithubAppInterface } from '@xrengine/common/src/interfaces/GithubAppInterface'

import GitHubIcon from '@mui/icons-material/GitHub'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Drawer from '@mui/material/Drawer'

import { NotificationService } from '../../../common/services/NotificationService'
import { ProjectService } from '../../../common/services/ProjectService'
import InputSelect, { InputMenuItem } from '../../common/InputSelect'
import InputText from '../../common/InputText'
import LoadingView from '../../common/LoadingView'
import styles from '../../styles/admin.module.scss'

interface Props {
  open: boolean
  repos: GithubAppInterface[]
  onClose: () => void
}

const AddProject = ({ open, repos, onClose }: Props) => {
  const [processing, setProcessing] = useState(false)
  const [projectURL, setProjectURL] = useState('')
  const [isPublicUrl, setIsPublicUrl] = useState(false)
  const { t } = useTranslation()

  const trySelectPublicUrl = () => {
    setIsPublicUrl(!isPublicUrl)
  }

  const tryUploadProject = async () => {
    try {
      if (projectURL !== '') {
        setProcessing(true)
        await ProjectService.uploadProject(projectURL)
        setProcessing(false)
        closeModal()
      }
    } catch (err) {
      setProcessing(false)
      NotificationService.dispatchNotify(err.message, { variant: 'error' })
    }
  }

  const closeModal = () => {
    setProjectURL('')
    onClose()
  }

  const projectMenu: InputMenuItem[] = repos.map((el) => {
    return {
      value: el.repositoryPath,
      label: `${el.name} (${el.user})`
    }
  })

  return (
    <React.Fragment>
      <Drawer anchor="right" classes={{ paper: styles.paperDrawer }} open={open} onClose={onClose}>
        <Container maxWidth="sm" className={styles.mt20}>
          <DialogTitle className={styles.textAlign}>{t('admin:components.project.addProject')}</DialogTitle>

          {!processing && (
            <div className={styles.inputContainer}>
              {!isPublicUrl && repos && repos.length != 0 ? (
                <InputSelect
                  name="projectURL"
                  label={t('admin:components.project.project')}
                  value={projectURL}
                  menu={projectMenu}
                  onChange={(e) => setProjectURL(e.target.value)}
                />
              ) : (
                <InputText
                  name="urlSelect"
                  label={t('admin:components.project.url')}
                  placeholder={t('admin:components.project.insertPublicUrl')}
                  value={projectURL}
                  onChange={(e) => setProjectURL(e.target.value)}
                />
              )}
            </div>
          )}

          {processing && <LoadingView title={t('admin:components.project.processing')} variant="body1" />}

          <DialogActions>
            {!processing && (
              <>
                <Button className={styles.submitButton} startIcon={<GitHubIcon />} onClick={tryUploadProject}>
                  {t('admin:components.project.uploadProject')}
                </Button>
                {repos && repos.length > 0 && (
                  <Button className={styles.submitButton} startIcon={<GroupIcon />} onClick={trySelectPublicUrl}>
                    {!isPublicUrl
                      ? t('admin:components.project.customPublicUrl')
                      : t('admin:components.project.selectFromList')}
                  </Button>
                )}
                <Button className={styles.cancelButton} onClick={onClose}>
                  {t('admin:components.setting.cancel')}
                </Button>
              </>
            )}
          </DialogActions>
        </Container>
      </Drawer>
    </React.Fragment>
  )
}

export default AddProject