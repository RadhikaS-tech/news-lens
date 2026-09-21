'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  Bookmark,
  ChevronRight,
  Clock3,
  Cpu,
  Globe2,
  Heart,
  Menu,
  Moon,
  Newspaper,
  Play,
  Search,
  Sparkles,
  Sun,
  TrendingUp,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = ['All stories', 'Technology', 'Business', 'Science', 'Culture', 'World']

const articles = [
  { id: 1, category: 'Technology', title: 'The quiet infrastructure powering the next wave of AI', excerpt: 'Inside the systems researchers are building to make intelligent tools more useful, reliable, and human.', source: 'The Verge', time: '8 min read', image: '/article-1.png', featured: true },
  { id: 2, category: 'Business', title: 'Markets find a new rhythm as investors look beyond the headlines', excerpt: 'A closer look at the signals shaping a surprisingly resilient global economy.', source: 'Financial Times', time: '6 min read', image: '/article-2.png' },
  { id: 3, category: 'Climate', title: 'A new blueprint for cities that work with nature', excerpt: 'What the world’s most ambitious urban projects can teach us about a cooler future.', source: 'Monocle', time: '5 min read', image: '/article-3.png' },
  { id: 4, category: 'Science', title: 'The mission to map our place in the universe', excerpt: 'Astronomers are getting closer to answering the questions we have carried for centuries.', source: 'New Scientist', time: '9 min read', image: '/article-4.png' },
  { id: 5, category: 'Health', title: 'The science of staying well in an always-on world', excerpt: 'New research is changing how we think about rest, focus, and the modern body.', source: 'Wired', time: '7 min read', image: '/article-5.png' },
  { id: 6, category: 'Technology', title: 'Why smaller models may be the biggest story in AI', excerpt: 'Efficiency is becoming the competitive edge for the next generation of intelligent software.', source: 'MIT Technology Review', time: '4 min read', image: '/article-6.png' },
]

const trends = [
  ['01', 'The global race to build better batteries', '12.4k readers'],
  ['02', 'How work is changing for good', '9.8k readers'],
  ['03', 'The return of the long-form essay', '7.2k readers'],
  ['04', 'Inside the world’s most liveable cities', '6.1k readers'],
]

export function NewsLens() {
  const [activeCategory, setActiveCategory] = useState('All stories')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState<number[]>([])
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredArticles = useMemo(() => articles.filter((article) => {
    const categoryMatch = activeCategory === 'All stories' || article.category === activeCategory || (activeCategory === 'World' && article.category === 'Climate')
    const queryMatch = !query || `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.toLowerCase())
    return categoryMatch && queryMatch
  }), [activeCategory, query])

  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return (
    <div className={dark ? 'dark min-h-screen bg-background' : 'min-h-screen bg-background'}>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-10">
            <a href="#top" className="flex items-center gap-3" aria-label="NewsLens home">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Newspaper size={18} /></span>
              <span className="font-display text-[21px] font-semibold tracking-[-0.04em]">NewsLens</span>
            </a>
            <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Primary navigation">
              <a className="font-medium text-foreground" href="#top">Home</a>
              <a className="transition-colors hover:text-foreground" href="#for-you">For You</a>
              <a className="transition-colors hover:text-foreground" href="#trending">Trending</a>
              <a className="transition-colors hover:text-foreground" href="#ai-brief">AI Brief</a>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSearchOpen((value) => !value)} aria-label="Toggle search"><Search /></Button>
              <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">{dark ? <Sun /> : <Moon />}</Button>
              <Button className="hidden rounded-full px-5 sm:inline-flex">Sign in</Button>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</Button>
            </div>
          </div>
          {searchOpen && <div className="border-t border-border/60 px-5 py-3 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-[1320px] items-center gap-3"><Search className="text-muted-foreground" size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories, topics, and ideas" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><button onClick={() => { setQuery(''); setSearchOpen(false) }} aria-label="Close search"><X size={18} className="text-muted-foreground" /></button></div></div>}
          {menuOpen && <nav className="flex flex-col gap-4 border-t border-border/60 px-5 py-5 text-sm md:hidden" aria-label="Mobile navigation"><a href="#top">Home</a><a href="#for-you">For You</a><a href="#trending">Trending</a><a href="#ai-brief">AI Brief</a><button className="flex items-center gap-2 text-left" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={16} /> : <Moon size={16} />} Toggle theme</button></nav>}
        </header>

        <main id="top" className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 lg:px-10">
          <section className="flex flex-col gap-7 pb-10 pt-9 sm:gap-8 sm:pb-12 sm:pt-12 lg:flex-row lg:items-end lg:justify-between lg:pt-20">
            <div className="max-w-2xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"><span className="size-1.5 rounded-full bg-chart-2" /> Tuesday, September 22, 2026</div><h1 className="font-display text-[2.9rem] font-medium leading-[0.94] tracking-[-0.065em] sm:text-6xl lg:text-[76px]">Stay curious.<br /><span className="text-muted-foreground">Stay informed.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">A smarter way to understand what&apos;s happening in the world. Thoughtful journalism, curated for your day.</p></div>
            <div className="flex max-w-sm items-center gap-4 border-l-2 border-primary pl-5 text-sm leading-6 text-muted-foreground"><Sparkles className="shrink-0 text-primary" size={22} /><p><strong className="text-foreground">Good morning, Alex.</strong><br />We&apos;ve picked 18 stories you might want to read today.</p></div>
          </section>

          <div className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto border-y border-border/70 px-5 py-3.5 sm:mx-0 sm:px-0 sm:py-4" role="tablist" aria-label="News categories">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>{category}</button>)}</div>

          <section id="for-you" className="pt-12"><div className="mb-6 flex items-end justify-between"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Editor&apos;s picks</p><h2 className="font-display text-3xl tracking-[-0.04em] sm:text-4xl">For you</h2></div><button className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex">View all <ChevronRight size={16} /></button></div>
            <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">{filteredArticles[0] && <article className="glass-surface group overflow-hidden rounded-2xl border bg-card/70"><div className="relative aspect-[16/9] overflow-hidden"><Image src={filteredArticles[0].image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" priority /><div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider">{filteredArticles[0].category}</div></div><div className="p-4 sm:p-5"><div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><span>{filteredArticles[0].source}</span><span className="size-1 rounded-full bg-border" /><span>{filteredArticles[0].time}</span></div><h3 className="max-w-xl font-display text-2xl leading-tight tracking-[-0.03em] sm:text-3xl">{filteredArticles[0].title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{filteredArticles[0].excerpt}</p><div className="mt-6 flex items-center justify-between"><button className="flex items-center gap-2 text-sm font-semibold">Read story <ChevronRight size={16} /></button><button onClick={() => toggleSaved(filteredArticles[0].id)} aria-label="Save article" className="text-muted-foreground hover:text-foreground">{saved.includes(filteredArticles[0].id) ? <Bookmark fill="currentColor" size={18} /> : <Bookmark size={18} />}</button></div></div></article>}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">{filteredArticles.slice(1, 3).map((article) => <SmallArticle key={article.id} article={article} saved={saved.includes(article.id)} onSave={() => toggleSaved(article.id)} />)}</div></div>
          </section>

          <div className="grid gap-12 pt-16 lg:grid-cols-[1fr_350px]">
            <section><div className="mb-6 flex items-end justify-between"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Fresh perspectives</p><h2 className="font-display text-3xl tracking-[-0.04em] sm:text-4xl">More to explore</h2></div><button className="hidden items-center gap-1 text-sm font-medium text-muted-foreground sm:flex">Latest <ChevronRight size={16} /></button></div><div className="grid gap-5 sm:grid-cols-2">{filteredArticles.slice(3).map((article) => <SmallArticle key={article.id} article={article} saved={saved.includes(article.id)} onSave={() => toggleSaved(article.id)} />)}</div></section>
            <aside id="trending" className="glass-surface rounded-2xl border bg-card/70 p-5 sm:p-6"><div className="mb-6 flex items-center justify-between"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Right now</p><h2 className="font-display text-2xl tracking-[-0.04em]">Trending</h2></div><TrendingUp className="text-primary" size={20} /></div><div className="flex flex-col">{trends.map(([number, title, readers]) => <div key={number} className="flex gap-4 border-t border-border/70 py-4 first:border-0"><span className="font-display text-xl text-muted-foreground/50">{number}</span><div><p className="text-sm font-medium leading-5">{title}</p><p className="mt-1 text-xs text-muted-foreground">{readers}</p></div></div>)}</div><button className="mt-2 flex items-center gap-1 text-sm font-semibold">See all trends <ChevronRight size={15} /></button></aside>
          </div>

          <section id="ai-brief" className="relative mt-14 overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground shadow-2xl shadow-primary/20 ring-1 ring-primary-foreground/15 sm:mt-16 sm:p-9 lg:p-12"><div className="absolute -right-12 -top-20 size-64 rounded-full border border-primary-foreground/10" /><div className="absolute -right-2 -top-8 size-40 rounded-full border border-primary-foreground/10" /><div className="relative grid gap-7 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-12"><div><div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/70"><Sparkles size={15} /> NewsLens AI brief</div><h2 className="max-w-md font-display text-4xl leading-[0.98] tracking-[-0.05em] sm:text-5xl">The day, in a few clear minutes.</h2><p className="mt-4 max-w-md text-sm leading-6 text-primary-foreground/70">Our AI reads across trusted sources to help you see the signal, not just the noise.</p><Button variant="secondary" className="mt-6 rounded-full">Listen to today&apos;s brief <Play data-icon="inline-end" /></Button></div><div className="glass-surface rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 text-primary-foreground shadow-xl sm:p-7"><div className="mb-4 flex items-center justify-between text-xs text-primary-foreground/60"><span>Tuesday&apos;s briefing</span><span>04:32</span></div><div className="flex items-start gap-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary"><Cpu size={17} /></span><div><p className="text-sm font-medium leading-6">Today&apos;s biggest story is a shift in how we build and use technology. Three themes are emerging: smaller AI models, more resilient infrastructure, and a renewed focus on human creativity.</p><div className="mt-4 flex items-center gap-2 text-xs text-primary-foreground/60"><span className="size-1.5 rounded-full bg-primary-foreground/60" /> AI-generated summary from 42 sources</div></div></div></div></div></section>
        </main>
        <footer className="border-t border-border"><div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><div className="flex items-center gap-2 font-medium text-foreground"><span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"><Newspaper size={13} /></span> NewsLens</div><div className="flex flex-wrap gap-5"><a href="#top">About</a><a href="#top">Editorial standards</a><a href="#top">Privacy</a><span>© 2026 NewsLens</span></div></div></footer>
      </div>
    </div>
  )
}

function SmallArticle({ article, saved, onSave }: { article: typeof articles[number], saved: boolean, onSave: () => void }) {
  return <article className="group flex gap-3 border-b border-border/70 pb-4 last:border-0"><div className="relative aspect-[1.2] w-24 shrink-0 overflow-hidden rounded-lg sm:w-32"><Image src={article.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="min-w-0 flex-1"><div className="mb-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-primary"><span>{article.category}</span><span className="size-1 rounded-full bg-border" /><span className="text-muted-foreground">{article.time}</span></div><h3 className="line-clamp-2 font-display text-base leading-tight tracking-[-0.025em]">{article.title}</h3><div className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span>{article.source}</span><button onClick={onSave} aria-label="Save article" className="hover:text-foreground">{saved ? <Bookmark fill="currentColor" size={15} /> : <Bookmark size={15} />}</button></div></div></article>
}
