"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
    return (
        <section id="contact" className="py-24 bg-accent-200/20 relative overflow-hidden">


            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    <div className="lg:w-1/3">
                        <span className="font-handwriting text-2xl text-accent-200">Kontaktirajte Nas</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-500 mt-2 mb-6">
                            Javite nam se!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Imate prijedlog za temu, osobu koju bismo trebali ugostiti ili komentar za nas? Voljeli bismo vas čuti!
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-dark-500 mb-1">Pošaljite nam Email</h4>
                                <a href="mailto:hello@backstagebeauty.com" className="text-accent-200 hover:underline">hello@backstagebeauty.com</a>
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-500 mb-1">Suradnje</h4>
                                <a href="mailto:partners@backstagebeauty.com" className="text-accent-200 hover:underline">partners@backstagebeauty.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 w-full">
                        <GlassContainer className="bg-white/60">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Ime</label>
                                        <Input placeholder="Ana Horvat" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <Input type="email" placeholder="jane@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Tema</label>
                                    <div className="relative">
                                        <select className="flex h-12 w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2 text-sm text-gray-700 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none backdrop-blur-sm">
                                            <option>Predloži Ideju</option>
                                            <option>Pohvala / Povratna Informacija</option>
                                            <option>Pridruži se Podcastu</option>
                                            <option>Ostalo</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Poruka</label>
                                    <textarea
                                        className="flex min-h-[150px] w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm resize-y"
                                        placeholder="Počnite pisati vašu poruku..."
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button size="lg">Pošalji Poruku</Button>
                                </div>
                            </form>
                        </GlassContainer>
                    </div>

                </div>
            </div>
        </section>
    );
}
