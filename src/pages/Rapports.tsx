
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Rapports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mensuel');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const tabs = [
    { id: 'mensuel', label: 'Rapport mensuel' },
    { id: 'hebdomadaire', label: 'Rapport hebdomadaire' },
    { id: 'personnalise', label: 'Personnalisé' }
  ];

  const handleGenerateReport = () => {
    alert('Génération du rapport en cours...');
  };

  const reportStats = [
    {
      title: "Heures travaillées",
      value: "1,248h",
      description: "Total ce mois",
      trend: "+12%"
    },
    {
      title: "Taux de présence",
      value: "94.5%",
      description: "Moyenne mensuelle",
      trend: "+2.1%"
    },
    {
      title: "Heures supplémentaires",
      value: "156h",
      description: "Ce mois",
      trend: "-8%"
    },
    {
      title: "Congés pris",
      value: "24",
      description: "Jours de congé",
      trend: "+15%"
    }
  ];

  const weeklyStats = [
    {
      title: "Heures travaillées",
      value: "312h",
      description: "Cette semaine",
      trend: "+5%"
    },
    {
      title: "Taux de présence",
      value: "96.2%",
      description: "Moyenne hebdomadaire",
      trend: "+1.5%"
    },
    {
      title: "Retards",
      value: "3",
      description: "Cette semaine",
      trend: "-2"
    },
    {
      title: "Absences",
      value: "2",
      description: "Cette semaine",
      trend: "-1"
    }
  ];

  const recentReports = [
    {
      id: '1',
      name: 'Rapport de présence - Octobre 2024',
      type: 'Présence',
      date: '01 Nov 2024',
      status: 'Généré',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Analyse des heures supplémentaires - Q3',
      type: 'Heures sup.',
      date: '28 Oct 2024',
      status: 'Généré',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Rapport de productivité - Septembre',
      type: 'Productivité',
      date: '25 Oct 2024',
      status: 'En cours',
      size: '-'
    }
  ];

  const breadcrumbItems = [
    { label: "Rapports" }
  ];

  return (
    <Layout pageTitle="Rapports" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          Rapports et analyses
        </h1>
        <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
          <button 
            onClick={handleGenerateReport}
            className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <Download className="w-4 h-4 text-slate-50" />
            <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
              Générer rapport
            </span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        onTabChange={setActiveTab}
        defaultActiveTab="mensuel"
      />

      {/* Monthly Report Content */}
      {activeTab === 'mensuel' && (
        <>
          {/* Report Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {reportStats.map((stat, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-slate-950">{stat.value}</h3>
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
                <p className="text-sm font-medium text-slate-700">{stat.title}</p>
                <p className="text-xs text-slate-500">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Recent Reports - Full Width */}
          <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-950 mb-4">Rapports récents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex flex-col gap-2 p-3 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-slate-950">{report.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      report.status === 'Généré' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{report.type}</span>
                    <span>{report.date}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-slate-500">{report.size}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                      disabled={report.status === 'En cours'}
                    >
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Weekly Report Content */}
      {activeTab === 'hebdomadaire' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {weeklyStats.map((stat, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-slate-950">{stat.value}</h3>
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
                <p className="text-sm font-medium text-slate-700">{stat.title}</p>
                <p className="text-xs text-slate-500">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-950 mb-4">Rapport hebdomadaire détaillé</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Présences par jour</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Lundi</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Mardi</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Mercredi</span>
                      <span className="text-sm font-medium">97%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Jeudi</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Vendredi</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Départements performants</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">IT</span>
                      <span className="text-sm font-medium text-green-600">99%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">RH</span>
                      <span className="text-sm font-medium text-green-600">97%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Finance</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Marketing</span>
                      <span className="text-sm font-medium text-orange-600">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Report Content */}
      {activeTab === 'personnalise' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-950 mb-4">Créer un rapport personnalisé</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date de début
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Sélectionner une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date de fin
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Sélectionner une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Type de rapport
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type de rapport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presence">Rapport de présence</SelectItem>
                  <SelectItem value="heures">Heures travaillées</SelectItem>
                  <SelectItem value="conges">Congés et absences</SelectItem>
                  <SelectItem value="productivite">Productivité</SelectItem>
                  <SelectItem value="overtime">Heures supplémentaires</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Départements
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les départements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="rh">RH</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Format d'export
              </label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Générer le rapport personnalisé
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Rapports;
