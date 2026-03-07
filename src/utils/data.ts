import type { Certificate, Chapter } from '#/types'

import certificatesData from '#/data/certificates.json'
import awsChapters from '#/data/chapters/aws-cloud-practitioner.json'
import azureChapters from '#/data/chapters/azure-fundamentals.json'
import comptiaChapters from '#/data/chapters/comptia-a-plus.json'

const chaptersMap: Record<string, Array<Chapter>> = {
  'aws-cloud-practitioner': awsChapters,
  'azure-fundamentals': azureChapters,
  'comptia-a-plus': comptiaChapters,
}

export function getCertificates(): Array<Certificate> {
  return certificatesData
}

export function getCertificateById(certId: string): Certificate | undefined {
  return certificatesData.find((cert) => cert.id === certId)
}

export function getChapters(certId: string): Array<Chapter> {
  return chaptersMap[certId] ?? []
}

export function getChapterById(
  certId: string,
  chapterId: string,
): Chapter | undefined {
  const chapters = getChapters(certId)
  return chapters.find((ch) => ch.id === chapterId)
}
