import { SAMPLE_ITEMS } from "@/lib/data"
import { ItemDetail } from "@/components/item/item-detail"
import { notFound } from "next/navigation"

interface ItemPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params
  const item = SAMPLE_ITEMS.find((i) => i.id === id)

  if (!item) {
    notFound()
  }

  return <ItemDetail item={item} />
}
