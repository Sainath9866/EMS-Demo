import { Shield, FileText, Download, Calendar as CalendarIcon } from 'lucide-react'

export default function HRPolicies() {
  const policies = [
    {
      id: '1',
      title: 'Employee Handbook 2024',
      description: 'Complete guide to company policies, procedures, and employee benefits',
      category: 'General',
      lastUpdated: '2024-01-15',
      version: '2.1',
      size: '2.5 MB'
    },
    {
      id: '2',
      title: 'Leave Policy',
      description: 'Detailed information about different types of leaves, eligibility, and application process',
      category: 'Leave Management',
      lastUpdated: '2024-03-10',
      version: '1.8',
      size: '1.2 MB'
    },
    {
      id: '3',
      title: 'Code of Conduct',
      description: 'Professional standards, ethical guidelines, and workplace behavior expectations',
      category: 'Ethics',
      lastUpdated: '2024-02-20',
      version: '3.0',
      size: '890 KB'
    },
    {
      id: '4',
      title: 'Remote Work Policy',
      description: 'Guidelines for remote work arrangements, equipment, and communication standards',
      category: 'Work Arrangements',
      lastUpdated: '2024-04-05',
      version: '1.5',
      size: '1.1 MB'
    },
    {
      id: '5',
      title: 'Performance Review Process',
      description: 'Annual performance evaluation criteria, timelines, and feedback procedures',
      category: 'Performance',
      lastUpdated: '2024-01-30',
      version: '2.3',
      size: '1.8 MB'
    },
    {
      id: '6',
      title: 'Health & Safety Guidelines',
      description: 'Workplace safety protocols, emergency procedures, and health requirements',
      category: 'Safety',
      lastUpdated: '2024-03-25',
      version: '1.9',
      size: '2.1 MB'
    }
  ]

  const handleDownload = (policyId: string) => {
    console.log('Downloading policy:', policyId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">HR Policies</h1>
        <div className="text-sm text-neutral-500">
          Access and download company policies and procedures
        </div>
      </div>

      {/* Policy Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['General', 'Leave Management', 'Ethics', 'Work Arrangements', 'Performance', 'Safety'].map((category) => (
          <div key={category} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 text-center hover:shadow-md transition-shadow">
            <Shield className="h-6 w-6 text-primary-blue mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-900">{category}</p>
          </div>
        ))}
      </div>

      {/* Policies List */}
      <div className="space-y-4">
        {policies.map((policy) => (
          <div key={policy.id} className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="h-5 w-5 text-primary-blue" />
                  <h3 className="text-lg font-semibold text-neutral-900">{policy.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium text-primary-blue bg-primary-blue/10 rounded-full">
                    {policy.category}
                  </span>
                </div>
                <p className="text-neutral-600 mb-4">{policy.description}</p>
                <div className="flex items-center space-x-6 text-sm text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated: {new Date(policy.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  <span>Version: {policy.version}</span>
                  <span>Size: {policy.size}</span>
                </div>
              </div>
              <button
                onClick={() => handleDownload(policy.id)}
                className="ml-4 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Policy Update Notice */}
      <div className="bg-primary-blue/10 border border-primary-blue/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-primary-blue mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-primary-blue mb-2">Policy Updates</h3>
            <p className="text-sm text-neutral-700 mb-3">
              All policies are reviewed and updated regularly. Please ensure you have the latest versions.
              If you have any questions about any policy, please contact the HR department.
            </p>
            <button className="text-sm text-primary-blue hover:underline font-medium">
              Contact HR Department
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
