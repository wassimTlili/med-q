import { Settings, Bell, Shield, Palette, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
          <p className="text-gray-600">Personnalisez votre expérience d'apprentissage</p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Rappels de révision</h4>
                  <p className="text-sm text-gray-600">Recevez des rappels pour vos sessions de révision</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Notifications par email</h4>
                  <p className="text-sm text-gray-600">Recevez des résumés hebdomadaires par email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Palette className="h-5 w-5 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Apparence</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Clair</option>
                  <option>Sombre</option>
                  <option>Automatique</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur d'accent</label>
                <div className="flex space-x-3">
                  <button className="w-8 h-8 bg-purple-600 rounded-full border-2 border-purple-600"></button>
                  <button className="w-8 h-8 bg-blue-600 rounded-full border-2 border-transparent hover:border-blue-600"></button>
                  <button className="w-8 h-8 bg-green-600 rounded-full border-2 border-transparent hover:border-green-600"></button>
                  <button className="w-8 h-8 bg-red-600 rounded-full border-2 border-transparent hover:border-red-600"></button>
                  <button className="w-8 h-8 bg-orange-600 rounded-full border-2 border-transparent hover:border-orange-600"></button>
                </div>
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Préférences d'étude</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée de session par défaut
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulté préférée
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Facile</option>
                  <option>Moyen</option>
                  <option>Difficile</option>
                  <option>Mixte</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Mode révision intensive</h4>
                  <p className="text-sm text-gray-600">Questions rapides sans explications détaillées</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Confidentialité et sécurité</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Changer le mot de passe</div>
                <div className="text-sm text-gray-600">Dernière modification il y a 3 mois</div>
              </button>
              
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Authentification à deux facteurs</div>
                <div className="text-sm text-gray-600">Sécurisez votre compte avec 2FA</div>
              </button>
              
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Télécharger mes données</div>
                <div className="text-sm text-gray-600">Obtenez une copie de vos données personnelles</div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Annuler
            </button>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
