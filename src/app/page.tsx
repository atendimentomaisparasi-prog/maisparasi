"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Users, Award, Heart, MessageCircle, CheckCircle, Target, TrendingUp, Zap, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [shapes, setShapes] = useState<Array<{
    id: number
    type: 'circle' | 'square'
    x: number
    y: number
    size: number
    vx: number
    vy: number
    color: string
    rotation: number
    rotationSpeed: number
  }>>([])

  useEffect(() => {
    // Criar formas animadas
    const newShapes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? 'circle' : 'square' as 'circle' | 'square',
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 60 + 20,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 4
    }))
    setShapes(newShapes)

    // Animação das formas
    const animate = () => {
      setShapes(prevShapes => 
        prevShapes.map(shape => {
          let newX = shape.x + shape.vx
          let newY = shape.y + shape.vy
          let newVx = shape.vx
          let newVy = shape.vy

          // Bounce nas bordas
          if (newX <= 0 || newX >= window.innerWidth - shape.size) {
            newVx = -newVx
            newX = Math.max(0, Math.min(window.innerWidth - shape.size, newX))
          }
          if (newY <= 0 || newY >= window.innerHeight - shape.size) {
            newVy = -newVy
            newY = Math.max(0, Math.min(window.innerHeight - shape.size, newY))
          }

          return {
            ...shape,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: shape.rotation + shape.rotationSpeed
          }
        })
      )
    }

    const interval = setInterval(animate, 16) // ~60fps
    return () => clearInterval(interval)
  }, [])

  const handleShapeClick = (id: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id
          ? {
              ...shape,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              rotationSpeed: (Math.random() - 0.5) * 8
            }
          : shape
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Fundo animado com formas interativas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {shapes.map(shape => (
          <div
            key={shape.id}
            className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              transform: `rotate(${shape.rotation}deg)`,
              borderRadius: shape.type === 'circle' ? '50%' : '10%',
              opacity: 0.7,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(1px)'
            }}
            onClick={() => handleShapeClick(shape.id)}
          />
        ))}
      </div>

      {/* Overlay gradiente para melhor legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/80 z-1"></div>

      {/* Header/Navigation */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/82b5fd3f-5656-4db3-9cd2-af983883b900.png" 
                alt="Mais Para Si - Logotipo" 
                className="h-10 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Início</a>
              <a href="#sobre" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Sobre Nós</a>
              <a href="#metodo" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Método</a>
              <a href="#servicos" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Serviços</a>
              <a href="#contacto" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Contacto</a>
            </nav>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open('https://wa.me/351926332483', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              🦷 Transforme a sua <span className="text-blue-300">Clínica Dentária</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
              Campanhas de publicidade online personalizadas que trazem novos pacientes todos os dias para a sua clínica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => window.open('https://wa.me/351926332483', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contactar via WhatsApp
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Saber Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section id="sobre" className="py-20 relative bg-blue-800/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                🦷 A Nossa Missão
              </h2>
              <p className="text-lg text-blue-100">
                Transformar clínicas dentárias através da publicidade online estratégica
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 gap-12">
              <div className="bg-blue-100/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-200/50 hover:shadow-2xl transition-all duration-300">
                <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                  Acreditamos no poder da publicidade online para transformar negócios e impulsionar o crescimento das clínicas dentárias.
                  A nossa missão é criar campanhas pagas personalizadas, desenvolvidas com estratégia, exclusividade e profissionalismo, para que cada clínica alcance resultados reais — com novos pacientes a chegar todos os dias.
                </p>
                <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                  Trabalhamos com total dedicação para compreender as necessidades de cada cliente e construir estratégias digitais eficazes, que geram visibilidade e retorno sobre o investimento.
                  Não seguimos modelos genéricos: criamos campanhas à medida, pensadas para destacar a sua clínica no mercado e atrair as pessoas certas no momento certo.
                </p>
                <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                  Sabemos que, no mundo digital, o maior arrependimento é de quem não arrisca.
                  Quem adia a decisão de investir em publicidade paga acaba por ver os concorrentes crescerem primeiro.
                  Por isso, a nossa missão é ajudar clínicas dentárias a dar o passo certo, com confiança, estratégia e resultados que realmente fazem a diferença.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg font-semibold text-blue-600">
                  Com a nossa equipa, o seu investimento transforma-se em crescimento constante — e em pacientes novos a entrarem pela porta todos os dias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Método Proprietário Section */}
      <section id="metodo" className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                O Nosso Método Proprietário
              </h2>
              <p className="text-lg text-blue-100">
                Estratégia comprovada que gera resultados consistentes
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Conteúdo do Método */}
              <div className="bg-blue-100/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-200/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">O Nosso Método Proprietário</h3>
                </div>
                
                <h4 className="text-xl font-semibold text-slate-900 mb-4">
                  Resultados consistentes, mês após mês, para clínicas dentárias
                </h4>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Desenvolvemos um método exclusivo que combina análise de mercado, segmentação precisa e otimização contínua. 
                  Este sistema proprietário permite-nos entregar campanhas que não só atraem pacientes, mas garantem um retorno 
                  sobre o investimento superior a 300% na maioria dos casos.
                </p>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  O nosso método baseia-se em três pilares fundamentais: estratégia personalizada, execução técnica impecável 
                  e acompanhamento dedicado. Cada campanha é construída especificamente para o perfil da sua clínica e do seu 
                  mercado local, garantindo que cada euro investido se traduza em novos pacientes.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <p className="text-slate-700 font-medium">
                    💡 <strong>Resultado garantido:</strong> Mais de 95% dos nossos clientes veem um aumento significativo 
                    no número de novos pacientes nos primeiros 30 dias.
                  </p>
                </div>
              </div>

              {/* Trabalhamos Em Conjunto */}
              <div className="bg-blue-100/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-200/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">Trabalhamos Em Conjunto</h3>
                </div>
                
                <h4 className="text-xl font-semibold text-slate-900 mb-4">
                  Parceria estratégica para o sucesso da sua clínica
                </h4>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Não somos apenas uma agência de marketing - somos o seu parceiro estratégico no crescimento da clínica. 
                  Trabalhamos lado a lado consigo, compreendendo os seus objetivos, desafios e visão para o futuro.
                </p>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  A nossa abordagem colaborativa significa que está sempre informado sobre o progresso das campanhas, 
                  com relatórios detalhados e reuniões regulares. Juntos, definimos estratégias, ajustamos táticas e 
                  celebramos os resultados.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-slate-700">Comunicação transparente e regular</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-slate-700">Estratégias adaptadas aos seus objetivos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-slate-700">Suporte dedicado e especializado</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-slate-700">Resultados mensuráveis e comprovados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-20 relative bg-blue-800/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-lg text-blue-100">
              Soluções de marketing digital especializadas para clínicas dentárias
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-blue-100/95 backdrop-blur-md border-blue-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Campanhas Personalizadas</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 mb-4">
                  Criamos campanhas de publicidade paga à medida da sua clínica, focadas em atrair os pacientes certos.
                </CardDescription>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Google Ads especializado
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Facebook e Instagram Ads
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Segmentação precisa
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-100/95 backdrop-blur-md border-blue-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Estratégia Digital</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 mb-4">
                  Desenvolvemos estratégias digitais completas que geram visibilidade e retorno sobre o investimento.
                </CardDescription>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Análise de mercado
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Otimização contínua
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Relatórios detalhados
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-100/95 backdrop-blur-md border-blue-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Resultados Garantidos</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 mb-4">
                  Foco em resultados reais: novos pacientes chegando à sua clínica todos os dias.
                </CardDescription>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Acompanhamento dedicado
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Suporte especializado
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    ROI comprovado
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Entre em Contacto
            </h2>
            <p className="text-lg text-blue-100">
              Pronto para fazer crescer a sua clínica dentária? Contacte-nos hoje mesmo!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Informações de Contacto */}
            <div className="space-y-8">
              <Card className="bg-blue-100/95 backdrop-blur-md border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">Informações de Contacto</CardTitle>
                  <CardDescription className="text-slate-600">
                    Entre em contacto connosco através dos seguintes meios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-slate-900">Telefones</div>
                      <div className="text-slate-600">926 332 483</div>
                      <div className="text-slate-600">965 667 847</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-slate-900">Email</div>
                      <div className="text-slate-600">atendimentomaisparasi@gmail.com</div>
                    </div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => window.open('https://wa.me/351926332483', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp: 926 332 483
                    </Button>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => window.open('https://wa.me/351965667847', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp: 965 667 847
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">🦷 Pronto para Crescer?</h3>
                  <p className="mb-6 text-blue-100">
                    Não deixe os seus concorrentes crescerem primeiro. 
                    Comece hoje a atrair novos pacientes para a sua clínica!
                  </p>
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://wa.me/351926332483', '_blank')}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Horários e Informações Adicionais */}
            <div className="space-y-8">
              <Card className="bg-blue-100/95 backdrop-blur-md border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">Horário de Atendimento</CardTitle>
                  <CardDescription className="text-slate-600">
                    Estamos disponíveis para o ajudar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">Segunda a Sexta</span>
                      <span className="text-slate-600">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">Sábado</span>
                      <span className="text-slate-600">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">Domingo</span>
                      <span className="text-slate-600">Fechado</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">WhatsApp disponível 24/7</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Resposta garantida em menos de 2 horas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-100/95 backdrop-blur-md border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">Porquê Escolher-nos?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-900">Especialização em Clínicas Dentárias</span>
                      <p className="text-slate-600 text-sm">Conhecemos o seu mercado como ninguém</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-900">Resultados Comprovados</span>
                      <p className="text-slate-600 text-sm">Mais de 95% de taxa de sucesso</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-900">Suporte Personalizado</span>
                      <p className="text-slate-600 text-sm">Acompanhamento dedicado e transparente</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-900">ROI Garantido</span>
                      <p className="text-slate-600 text-sm">Retorno superior a 300% na maioria dos casos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-blue-900 text-white py-12 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/82b5fd3f-5656-4db3-9cd2-af983883b900.png" 
                  alt="Mais Para Si - Logotipo" 
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-blue-100 mb-4">
                Campanhas de publicidade online personalizadas para clínicas dentárias. 
                Novos pacientes todos os dias.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-600 text-blue-100 hover:bg-blue-800 transition-all duration-300"
                  onClick={() => window.open('https://wa.me/351926332483', '_blank')}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#metodo" className="hover:text-white transition-colors">Método</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-blue-100">
                <li className="hover:text-white transition-colors">Campanhas Google Ads</li>
                <li className="hover:text-white transition-colors">Facebook & Instagram Ads</li>
                <li className="hover:text-white transition-colors">Estratégia Digital</li>
                <li className="hover:text-white transition-colors">Consultoria Especializada</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  926 332 483
                </li>
                <li className="flex items-center hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  965 667 847
                </li>
                <li className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  atendimentomaisparasi@gmail.com
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Mais Para Si. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}